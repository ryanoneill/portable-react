var React = require('react');
var Route = require('react-router').Route;

var Tweet = require('./components/Tweet.jsx');

var routes = (
  <Route name='tweet' path='/' handler={Tweet} />
)

module.exports = routes;
