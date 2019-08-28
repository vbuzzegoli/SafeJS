var path = require('path');
var fs = require('fs');
var log = require('./log');
var utils = require('../utils');

var clearTemp = function (options) {
  try {
    fs.unlinkSync(path.resolve(utils.getTempOutputPath(options)));
  } catch (error) {
    log.error('[FATAL] Error encountered while attempting to delete the temporary assets: ', error);
    process.exit(1);
  }
}

module.exports = clearTemp;
