var path = require('path');
var fs = require('fs');
var compile = require('@sweet-js/core').compile;
var log = require('./log');
var utils = require('../utils');
var constants = require('../constants');

var transpileTemp = function (outputPath, loader, options) {
  try {
    var output = compile(fs.realpathSync(path.resolve(utils.getTempOutputPath(options))), loader, {
      noBabel: options[constants.OPTIONS.NO_BABEL]
    }).code;
    fs.writeFileSync(outputPath, output, { encoding: 'utf8', flag: 'a' });
  } catch (error) {
    log.error('[FATAL] Error encountered while attempting to transpile the temporary source: ', error);
    process.exit(1);
  }
}

module.exports = transpileTemp;
