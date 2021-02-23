const { IEX } = require('@xstocks/data');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  getQuote: async (symbol) => {
    const res = await IEX.getQuote(symbol);
    return res;
  },
  getCurrentPrice: async (symbol) => IEX.getLatestPrice(symbol),
  getChartData: async (symbol, period) => {
    const res =
      period.toLowerCase() === '1d'
        ? await IEX.getChartData(symbol, '1d', 12)
        : await IEX.getChartData(symbol, period);
    return res;
  },
  getCompanyInfo: async (symbol) => {
    const res = await IEX.getCompanyInfo(symbol);
    return res;
  },
  getCompanyNews: async (symbol) => {
    const res = await IEX.getCompanyNews(symbol);
    return res;
  },
};
