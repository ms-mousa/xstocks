const axios = require('axios');
const qs = require('qs');

const baseURL = `${process.env.IEX_BASE_URL}/${process.env.IEX_API_VERSION}`;
const baseOptions = {
  token: process.env.IEX_TOKEN,
};
const IEX = {};

/**
 * This function returns the quote for a company
 * @param {string} symbol The symbol of the stock to retrieve
 */
const getQuote = async (symbol) => {
  const { data } = await axios
    .get(`${baseURL}/stock/${symbol}/quote?${qs.stringify(baseOptions)}`)
    .then((res) => res)
    .catch((err) => err.message);
  return data;
};

/**
 * This function only returns the latest price for a stock
 * @param {string} symbol The symbol of the stock to retrieve
 */
const getLatestPrice = async (symbol) => {
  const { data } = await axios
    .get(`${baseURL}/stock/${symbol}/quote/latestPrice?${qs.stringify(baseOptions)}`)
    .then((res) => res)
    .catch((err) => err.message);
  return data;
};

/**
 * This function will return the company details
 * @param {string} symbol The symbol stock of the company
 */
const getCompanyInfo = async (symbol) => {
  const { data } = await axios
    .get(`${baseURL}/stock/${symbol}/company?${qs.stringify(baseOptions)}`)
    .then((res) => res)
    .catch((err) => err.message);

  return data;
};

/**
 * This function returns the data to draw a chart of one stock
 * @param {string} symbol The symbol of the stock to retrieve
 * @param {string} period Time period of the chart
 * @param {boolean} chartCloseOnly Only send back the close price
 * @param {boolean} displayPercent Display the change in percent directly
 */
const getChartData = async (
  symbol,
  period = '5d',
  chartInterval,
  chartCloseOnly = true,
) => {
  const options = {
    ...baseOptions,
    chartCloseOnly,
    chartInterval,
  };

  const { data } = await axios
    .get(`${baseURL}/stock/${symbol}/chart/${period}?${qs.stringify(options)}`)
    .then((res) => res)
    .catch((err) => err.message);
  return data;
};

/**
 * This function returns the data to draw a chart of one stock
 * @param {string} symbol The symbol of the company to retrieve its latest news
 */
const getCompanyNews = async (symbol) => {
  const options = {
    ...baseOptions,
  };
  const { data } = await axios
    .get(`${baseURL}/stock/${symbol}/news/last/3?${qs.stringify(options)}`)
    .then((res) => res)
    .catch((err) => err.message);
  return data;
};

IEX.getQuote = getQuote;
IEX.getChartData = getChartData;
IEX.getLatestPrice = getLatestPrice;
IEX.getCompanyInfo = getCompanyInfo;
IEX.getCompanyNews = getCompanyNews;

module.exports = IEX;
