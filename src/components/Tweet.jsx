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
    return (
      <div className="tweet">
        <div className="user">
          <img className="avatar" src={this.state.tweet.user.profile_image_url} />
          <div className="info">
            <div className="name">
              {this.state.tweet.user.name}
            </div>
            <div className="screen_name">
              @{this.state.tweet.user.screen_name}
            </div>
          </div>
        </div>
        <p className="text">{this.state.tweet.text}</p>
      </div>
    )
    // return <div>{this.state.tweet.text}</div>;
  }
});

module.exports = Tweet;
