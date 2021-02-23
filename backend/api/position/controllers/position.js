const numeral = require('numeral');

const { sanitizeEntity } = require('strapi-utils');
const { objToCamelCase } = require('../../../helpers/caseConvert');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Create a position for the logged in user.
   *
   * @return {Object}
   */
  async create(ctx) {
    const userID = ctx.state.user.id;
    const { symbol, purchase_price, units } = ctx.request.body;
    const position = await strapi.services.position.create({
      user: userID,
      symbol,
      purchase_value: parseFloat(purchase_price * units),
      ...ctx.request.body,
    });
    // try to find user's portfolio
    const userPortfolio = await strapi.services.portfolio.findOne({
      user: userID,
    });
    // if user hasn't got a portfolio, create one
    if (!userPortfolio) {
      await strapi.services.portfolio.create({
        user: userID,
        positions: [position._id],
        chart_data: [{ x: new Date().toLocaleString(), y: position.purchase_value }],
      });
    } else {
      // portfolio exists -> find today's entry,
      let todaysData = userPortfolio.chart_data.find(
        (entry) => entry.x === new Date().toLocaleString(),
      );
      //  if entry exists, update it
      if (todaysData) {
        todaysData.y += position.purchase_value;
      } else {
        // otherwise make a new entry for today <- An existing portfolio without an entry for today
        todaysData = { x: new Date().toLocaleString(), y: position.purchase_value };
      }

      await strapi.query('portfolio').update(
        { _id: userPortfolio._id },
        {
          ...userPortfolio,
          chartData: [...userPortfolio.chart_data, todaysData],
          positions: [...userPortfolio.positions, position._id],
        },
      );
    }

    const entity = sanitizeEntity(position, { model: strapi.models.position });
    return objToCamelCase(entity);
  },

  /**
   * Retrieve all positions for the logged in user.
   *
   * @return {Array}
   */
  async find(ctx) {
    let entities;
    const userID = ctx.state.user.id;
    // eslint-disable-next-line no-underscore-dangle
    if (ctx.query._q) {
      entities = await strapi.services.position.search(ctx.query);
    } else {
      entities = await strapi.services.position.find({
        user: userID,
        ...ctx.query,
      });
    }

    return Promise.all(
      entities.map(async (entity) => {
        const currentPrice = await strapi.services.stock.getCurrentPrice(entity.symbol);
        const currentValue = entity.units * currentPrice;
        const profitLoss = (currentValue - entity.purchase_value).toFixed(3);
        const profitLossPercent = profitLoss / entity.purchase_value;
        const strapiEntity = {
          ...sanitizeEntity(entity, { model: strapi.models.position }),
          current_value: numeral(currentValue).format('$0,0.00'),
          purchase_value: numeral(entity.purchase_value).format('$0,0.00'),
          profit_loss: numeral(profitLoss).format('$0,0.00'),
          profit_loss_percent: numeral(profitLossPercent).format('0.0%'),
          profit: currentValue > entity.purchase_value,
          purchase_price: numeral(entity.purchase_price).format('$0,0.00'),
        };
        return objToCamelCase(strapiEntity);
      }),
    );
  },

  /**
   * Retrieve a position for the logged in user
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { id } = ctx.params;
    const userID = ctx.state?.user.id;

    const entity = await strapi.services.position.findOne({ id, user: userID });
    const currentPrice = await strapi.services.stock.getCurrentPrice(entity.symbol);
    return {
      current_value: entity.units * currentPrice,
      ...sanitizeEntity(entity, { model: strapi.models.position }),
    };
  },

  /**
   * Close a position for the logged in user
   *
   * @return {Object}
   */

  async closePosition(ctx) {
    const { id } = ctx.params;
    const userID = ctx.state?.user.id;
    const doc = await strapi.query('position').model.findOne({ _id: id, user: userID });
    const currentPrice = await strapi.services.stock.getCurrentPrice(
      doc.symbol.toString(),
    );
    doc.closed_value = doc.units * currentPrice;
    doc.open = false;
    await doc.save();
    const newDoc = await strapi.query('position').model.findOne({}).exec();
    // return strapi object or return doc or return confirmation
    const strapiEntity = sanitizeEntity(newDoc, { model: strapi.models.position });
    return objToCamelCase(strapiEntity);
  },
};
