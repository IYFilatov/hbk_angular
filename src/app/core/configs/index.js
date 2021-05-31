const constants = require('./constants.ts');

const journalCurr = require('./dictJournals/currencies.json');
const journalBanks = require('./dictJournals/banks.json');
const journalCosts = require('./dictJournals/costs.json');
const journalIncomes = require('./dictJournals/incomes.json');

module.exports = {
  constants,

  currencies: journalCurr,
  banks: journalBanks,
  costs: journalCosts,
  incomes: journalIncomes
};