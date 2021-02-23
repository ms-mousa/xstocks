/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require('strapi-utils');
const uniq = require('lodash.uniq');
const { objToCamelCase } = require('../../../helpers/caseConvert');

module.exports = {
  find: async (ctx) => {
    const userID = ctx.state.user.id;
    const userPortfolio = await strapi.services.portfolio.findOne({
      user: userID,
    });

    const portfolioEntity = sanitizeEntity(userPortfolio, {
      model: strapi.models.portfolio,
    });
    return objToCamelCase(portfolioEntity);
  },
  updateChart: async (ctx) => {
    const { id } = ctx.params;

    await strapi.services.portfolio.updateChartData(id);
  },
  getSymbols: async (ctx) => {
    const userID = ctx.state.user.id;
    const userPortfolio = await strapi.services.portfolio.findOne({
      user: userID,
    });
    const symbolsArray = userPortfolio.positions.map((position) => position.symbol);
    return uniq(symbolsArray);
  },
};
