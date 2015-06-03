var React = require('react');
var TweetStore = require('../stores/TweetStore');
var TwitterApi = require('../twitter-api');

var Tweet = React.createClass({
  statics: {
    fetchData (params) {
      return TwitterApi.getTweet(params.tweetId);
    },
    getStoreName () {
      return 'TweetStore';
    },
    getDataName () {
      return 'tweet';
    }
  },

  getInitialState() {
    return TweetStore.getState();
  },

  render() {
    return <div>{this.state.tweet.text}</div>
  }
});

module.exports = Tweet;
