const axios = require('axios');
const { objToCamelCase } = require('../../../helpers/caseConvert');
const symbols = require('../assets/symbols.json');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const grabImageURL = async (url) =>
  axios.get(url, { maxRedirect: 0 }).then((r) => r.request.res.responseUrl);

module.exports = {
  async search(ctx) {
    const { query } = ctx.params;
    const searchTerm = query.toString().toLowerCase();
    const filtered = await symbols
      .filter(
        (entry) =>
          entry.symbol.toLowerCase().includes(searchTerm) ||
          entry.name.toLowerCase().includes(searchTerm),
      )
      .slice(0, 10);
    return filtered;
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const stockQuote = await strapi.services.stock.getQuote(id);
    return stockQuote;
  },

  async getChart(ctx) {
    const { id, period } = ctx.params;
    if (!id) return undefined;

    const stockChartData = await strapi.services.stock.getChartData(id, period);
    if (!stockChartData) return undefined;
    const oneDayRequested = period.toLowerCase() === '1d';
    const dataPair = oneDayRequested
      ? stockChartData
          .filter((x) => !!x.close)
          .map((item) => ({
            x: new Date(`${item.date} ${item.minute}`),
            y: item.close,
          }))
      : stockChartData.map((item) => ({
          x: new Date(item.date),
          y: item.close,
        }));
    const periodClosePrice = stockChartData[stockChartData?.length - 1].close;
    const periodChangePercent = stockChartData[stockChartData?.length - 1].changeOverTime;
    const periodChangeValue = periodClosePrice - stockChartData[0].close;
    const moveUp = oneDayRequested
      ? stockChartData[stockChartData?.length - 1].close - stockChartData[0].close > 0
      : parseFloat(periodChangePercent, 10) > 0;

    return {
      dataPair,
      periodClosePrice,
      periodChangeValue,
      periodChangePercent,
      moveUp,
    };
  },

  async getCompany(ctx) {
    const { id } = ctx.params;
    const companyInformation = await strapi.services.stock.getCompanyInfo(id);
    return objToCamelCase(companyInformation);
  },

  async getNews(ctx) {
    const { symbol } = ctx.params;
    const news = await strapi.services.stock.getCompanyNews(symbol);
    const englishNews = news.filter((x) => x.lang === 'en');
    const newsWithImage = await Promise.all(
      englishNews.map(async (item) => {
        const imageURL = await grabImageURL(item.image);
        return {
          ...item,
          image: imageURL,
        };
      }),
    );

    return newsWithImage;
  },
};

// const res = await Promise.all(
//   JSON.parse(symbolsArray).map(async (s) => {
//     const news = await strapi.services.stock.getCompanyNews(s);
//     const englishNews = news.filter((x) => x.lang === 'en');
//     const newsWithImage = await Promise.all(
//       englishNews.map(async (item) => {
//         const imageURL = await grabImageURL(item.image);
//         return {
//           ...item,
//           image: imageURL,
//         };
//       }),
//     );
//     return newsWithImage;
//   }),
// );
