var alt = require('../alt');

function UserStore() {
  this.user = {};
}

module.exports = alt.createStore(UserStore, 'UserStore');
