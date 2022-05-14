const crypto = require('crypto');

const createRandomString = (numChar) => {
  if (numChar % 2 === 0) {
    return crypto.randomBytes(numChar / 2).toString('hex');
  }
  return (
    crypto.randomBytes(Math.floor(numChar / 2)).toString('hex') +
    crypto.randomBytes(1).toString('hex')[0]
  );
};

module.exports = createRandomString;
