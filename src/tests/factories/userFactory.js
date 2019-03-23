/*
*
*   Creates a new user for testing purposes
*
*/

// const mongoose = require('mongoose');
// const user = mongoose.model('User');
// const keys = require('../../config/keys');

module.exports = (type) => {

  if (type === 'verified') {
    return {
      email: keys.verifiedDummyUserEmail,
      password: keys.verifiedDummyUserPassword
    }
  }
  else if (type === 'notVerified') {
    return {
      email: keys.notverifiedDummyUserEmail,
      password: keys.notverifiedDummyUserPassword
    }
  }
}