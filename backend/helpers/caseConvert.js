const camelCase = require('lodash.camelcase');
const mapKeys = require('lodash.mapkeys');

module.exports = {
  objToCamelCase: (obj) => mapKeys(obj, (val, key) => camelCase(key)),
};
