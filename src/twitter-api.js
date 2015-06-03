var keys = require('../keys.json');
var superagent = require('superagent');
var superagent_oauth = require('superagent-oauth');
var OAuth = require('oauth');

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

var API = 'https://api.twitter.com/1.1';

var getTweet = function (id) {
  return new Promise(function (resolve, reject) {
    var url = API + '/statuses/show/' + id + '.json';
    superagent.get(url)
      .sign(oauth, keys.token, keys.secret)
      .end(function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
  });
};

module.exports = {
  getTweet: getTweet
};
