/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  updateChartData: async (id) => {
    const portfolio = await strapi.query('portfolio').findOne({
      _id: id,
    });
    const { positions, chart_data } = portfolio;

    let totalValue = 0;
    await Promise.all(
      positions.map(async (positionObj) => {
        if (!positionObj.open) return;
        const currentValue = await strapi.services.position.getCurrentValue(
          positionObj._id,
        );
        totalValue += currentValue;
      }),
    );

    // portfolio exists -> find today's entry,
    let todaysData = chart_data.find((entry) => entry.x === new Date().toLocaleString());
    //  if entry exists, update it
    if (todaysData) {
      todaysData.y += totalValue;
      const index = chart_data.indexOf(todaysData);
      chart_data[index] = todaysData;
      console.log(chart_data[index]);
      // Update the chart entry
      await strapi
        .query('portfolio')
        .update({ _id: id }, { chart_data: [...chart_data] });
    } else {
      // otherwise make a new entry for today <- An existing portfolio without an entry for today
      todaysData = { x: new Date().toLocaleString(), y: totalValue };
      // Update the chart
      await strapi
        .query('portfolio')
        .update({ _id: id }, { chart_data: [...chart_data, todaysData] });
    }
  },
};
