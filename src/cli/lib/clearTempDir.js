var rimraf = require('rimraf');
var path = require('path');
var log = require('./log');
var utils = require('../utils');

var clearTempDir = function (options) {
  try {
    log.process('Clearing cache..');
    rimraf.sync(path.resolve(utils.getTempOutputDir(options)));
  } catch (error) {
    log.error('[FATAL] Error encountered while attempting to clear the temp directory: ', error);
    process.exit(1);
  }
}

module.exports = clearTempDir;
