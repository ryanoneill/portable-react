var alt = require('../alt');

function TweetStore() {
  this.tweet = {};
}

module.exports = alt.createStore(TweetStore, 'TweetStore');
