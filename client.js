var http = require('http');
var querystring = require('querystring');
var _ = require('underscore');

// Class
var Client = function(options) {
  if (!options) {
    options = {};
  }
//  this._host = options.host || 'api.dev.creativelive.com';
  this._host = this._getHost(options);
  this._resource = options.resource || 'courses';
  this._port = options.port || 80;
};

// Class Methods
_.extend(Client, {

});

// Instance Methods
_.extend(Client.prototype, {
  search : function(text, options, callback) {
    var queryObject = {
      text : '"' + text + '"'
    };
    var path = null;
    var encoded = null;

    if (options.fields) {
      queryObject.fields = JSON.stringify(options.fields)
    }
    if (options.limit) {
      queryObject.limit = JSON.stringify(options.limit)
    }
    encoded = querystring.stringify(queryObject);
    path = '/search/' + this._resource + "?" + encoded;
    this._makeGetRequest(path, callback);
  },

  _makeGetRequest : function(path, callback) {
    var self = this;
    var requestOptions = {
      hostname : this._host,
      port     : this._port,
      path     : path,
      method   : 'GET'
    };
console.log("The non-working options are:\n", requestOptions);
    var response = '';
    var req = http.request(requestOptions, function(res) {
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        response = response + chunk;
      });
      res.on('end', function() {
        callback(null, self._getData(response));
      });
    });
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
    });
    req.end();
  },

  _getData : function(response) {
console.log("Inside getData, got called with response:\n", response);
    var parsedResponse = JSON.parse(response);

    return parsedResponse.data;
  },

  _getHost : function(options) {
    var host = 'api.dev.creativelive.com';

    if (options.host) {
      host = options.host.replace(/^\/+/, '');
    }
    return host;
  }
});

module.exports = Client;
