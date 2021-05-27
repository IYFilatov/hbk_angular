const constants = require('./constants.ts');

const journalCurr = require('./dictJournals/currencies.json');

module.exports = {
  constants,

  currencies: journalCurr
};