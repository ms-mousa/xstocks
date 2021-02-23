'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
 */

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */
  // '0 1 * * 1': () => {
  //
  // },
  // run every 10 mins
    '*/10 * * * *': async () => {
    console.log('=========> Updating the value of the portfolio');
    const portfolios = await strapi.services.portfolio.find({})
    console.log('Found ',portfolios.length, 'portfolios')
    await Promise.all(
      portfolios.map(async(p)=> {
        console.log('=========> Updating one portfolio')
        await strapi.services.portfolio.updateChartData(p._id)
        console.log('=========> Done updating')
      })
    )
  },
};
