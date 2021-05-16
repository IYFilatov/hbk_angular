const apiSigninAdmin = require('./auth/signinAdmin.json'); //http://localhost:8080/api/auth/signin
const apiSigninFailed = require('./auth/signinFailed.json');
const apiSignupFailed = require('./auth/signupFailed.json');
const apiNotAuthorized = require('./auth/notAuthorized.json');

const apiDict = require('./dict/apiDict.json');
const apiDictBanks = require('./dict/apiDictBanks.json');
const apiDictBanksId = require('./dict/apiDictBanksId.json');
const apiDictCurrencies = require('./dict/apiDictCurrencies.json');
const apiDictCurrId = require('./dict/apiDictCurrId.json');

module.exports = {
  apiSigninAdmin,
  apiSigninFailed,
  apiSignupFailed,
  apiNotAuthorized,

  apiDict,
  apiDictBanks,
  apiDictBanksId,
  apiDictCurrencies,
  apiDictCurrId
};