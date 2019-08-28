var rimraf = require('rimraf');
var path = require('path');
var log = require('./log');

var clearDir = function (dir, forbiddenDir) {
  if (!dir ||
    path.resolve(dir) === '/' ||
    path.resolve(dir) === '~' ||
    path.resolve(dir) === '~/' ||
    path.resolve(dir) === path.resolve(forbiddenDir)) {
      log.error('Invalid output path. Could not safely remove previous build.', path.resolve(dir));
      process.exit(1);
  }
  try {
    var dirPath = path.resolve(dir)
    log.process('Clearing previous predist..');
    rimraf.sync(dirPath);
  } catch (error) {
    log.error('[FATAL] Error encountered while attempting to clear the previous predist directory: ', error);
    process.exit(1);
  }
}

module.exports = clearDir;
