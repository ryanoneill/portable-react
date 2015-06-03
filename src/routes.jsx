var React = require('react');
var Route = require('react-router').Route;

var Tweet = require('./components/Tweet.jsx');
var User = require('./components/User.jsx');

var routes = (
  <Route name='home' path='/'>
    <Route name='tweet' path='/tweet/:tweetId' handler={Tweet} />
    <Route name='user' path='/user/:username' handler={User} />
  </Route>
)

module.exports = routes;
