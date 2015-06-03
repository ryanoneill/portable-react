require('node-jsx').install({ extension: '.jsx', harmony: true });

var http = require('http');
var Router = require('react-router');
var React = require('react');
var Iso = require('iso');

var routes = require('./src/routes');
var alt = require('./src/alt');

var buildBootstrapData = function (handler, data) {
  var storeData = {};
  storeData[handler.getDataName()] = data;
  var store = {};
  store[handler.getStoreName()] = storeData;
  return JSON.stringify(store);
};

var getPageHandler = function (state) {
  if (state.routes.length >= 2) {
    return state.routes[1].handler; // 0 is the root
  } else {
    return undefined;
  }
};

var server = http.createServer(function (request, response) {
  Router.run(routes, request.url, function (Handler, state) {
    var handler = getPageHandler(state);
    if (handler) {
      handler.fetchData(state.params).then(function (data) {
        alt.bootstrap(buildBootstrapData(handler, data));
        var content = React.renderToString(React.createElement(Handler));

        var iso = new Iso();
        iso.add(content, alt.flush());

        response.end(iso.render());
      }).catch(function () {
        response.end('error occurred');
      });
    } else {
      response.end('unknown route');
    }
  });
});

server.listen(8080);
