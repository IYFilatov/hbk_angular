const constants = require('./constants.ts');

const journalCurr = require('./dictJournals/currencies.json');
const journalBanks = require('./dictJournals/banks.json');

module.exports = {
  constants,

  currencies: journalCurr,
  banks: journalBanks
};