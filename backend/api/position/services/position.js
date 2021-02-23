/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  getCurrentValue: async (id) => {
    const position = await strapi.services.position.findOne({ id });
    console.log(position.symbol);
    const currentPrice = await strapi.services.stock.getCurrentPrice(position.symbol);
    console.log(currentPrice, 'currentPrice response');
    const currentValue = position.units * currentPrice;
    return currentValue;
  },
};
