#!/usr/bin/env node

var path = require('path');
var transpile = require('./lib/index.js');
var utils = require('./utils.js');
var constants = require('./constants.js');

var main = function () {
  var [,, ...args] = process.argv;

  // default options
  var options = {};
  options[constants.OPTIONS.NO_BABEL] = true;

  // config file support
  var config = {};
  try {
    var config = require(path.resolve('./' + constants.DEFAULT_CONFIG_FILE));
  } catch (err) {}
  if (config && Object.keys(config).length) {
    Object.keys(config).forEach(function (key){
      options[key] = config[key];
    });
  }

  // args support
  if (args && args.length) {
    args.forEach(function (arg){
      var parsedArg = utils.parseArg(arg);
      if (parsedArg.key && parsedArg.key !== constants.OPTIONS.EXCLUDE) {
        options[parsedArg.key] = parsedArg.value;
      }
    });
  }

  transpile(options);
}

// process
main();
