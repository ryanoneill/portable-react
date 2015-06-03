var React = require('react');
var TweetStore = require('../stores/TweetStore');

var Tweet = React.createClass({
  getInitialState() {
    return TweetStore.getState();
  },

  render() {
    return <div>{this.state.tweet.text}</div>
  }
});

module.exports = Tweet;
