require('node-jsx').install({ extension: '.jsx', harmony: true });

var http = require('http');
var Router = require('react-router');
var React = require('react');
var Iso = require('iso');

var routes = require('./src/routes');
var alt = require('./src/alt');
var twitterApi = require('./src/twitter-api');

var server = http.createServer(function (request, response) {
  twitterApi.getTweet('605608462622420992')
    .then(function (data) {
      var iso = new Iso();
      alt.bootstrap(JSON.stringify({ TweetStore: { tweet: data.body } }));
      Router.run(routes, request.url, function (Handler) {
        var content = React.renderToString(React.createElement(Handler));
        iso.add(content, alt.flush());
        response.end(iso.render());
      });
    });
});

server.listen(8080);
