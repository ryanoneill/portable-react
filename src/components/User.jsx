var React = require('react');
var UserStore = require('../stores/UserStore');
var TwitterApi = require('../twitter-api');

var User = React.createClass({
  statics: {
    fetchData (params) {
      return TwitterApi.getUser(params.username);
    },
    getStoreName () {
      return 'UserStore';
    },
    getDataName () {
      return 'user';
    }
  },

  getInitialState() {
    return UserStore.getState();
  },

  render() {
    return (
      <div className="user">
        <img className="avatar"
             src={this.state.user.profile_image_url} />
        <div className="info">
          <div className="name">
            {this.state.user.name}
          </div>
          <div className="screen_name">
            @{this.state.user.screen_name}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = User;
