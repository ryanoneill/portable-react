require('node-jsx').install({ extension: '.jsx', harmony: true });

var http = require('http');
var keys = require('./keys.json');
var superagent = require('superagent');
var superagent_oauth = require('superagent-oauth');
var OAuth = require('oauth');

var Router = require('react-router');
var React = require('react');
var Iso = require('iso');

var routes = require('./src/routes');
var alt = require('./src/alt');

superagent_oauth(superagent);

var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  keys.consumer_key,
  keys.consumer_secret,
  '1.0A',
  null,
  'HMAC-SHA1'
);

var server = http.createServer(function (request, response) {
  superagent.get('https://api.twitter.com/1.1/statuses/show/605608462622420992.json')
    .sign(oauth, keys.token, keys.secret)
    .end(function (err, result) {
      var iso = new Iso();
      alt.bootstrap(JSON.stringify({ TweetStore: { tweet: result.body } }));
      Router.run(routes, request.url, function (Handler) {
        var content = React.renderToString(React.createElement(Handler));
        iso.add(content, alt.flush());
        response.end(iso.render());
      });
    });
});

server.listen(8080);
