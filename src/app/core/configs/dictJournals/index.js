const journalCurr = require('./currencies.json');
const journalBanks = require('./banks.json');
const journalCosts = require('./costs.json');
const journalIncomes = require('./incomes.json');
const journalBankAcc = require('./bankaccounts.json');

module.exports = {
  currencies: journalCurr,
  banks: journalBanks,
  costs: journalCosts,
  incomes: journalIncomes,
  bankaccounts: journalBankAcc
};