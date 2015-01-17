var moment = require('moment');

module.exports = function (msg) {
  console.log('[' + moment().format('MMM DD YYYY') + '] ' + msg);
};