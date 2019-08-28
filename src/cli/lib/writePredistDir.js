var path = require('path');
var fs = require('fs');
var log = require('./log');
var constants = require('../constants');
var utils = require('../utils');

var writePredistDir = function (inputDir, outputDir, folders, options) {
  try {
    fs.mkdirSync(path.resolve(outputDir));
    fs.mkdirSync(path.resolve(utils.getTempOutputDir(options)));
    if (folders && utils.isArray(folders)) {
      folders.forEach(function (folder) {
        fs.mkdirSync(
          path.resolve(outputDir, path.relative(inputDir, folder)),
          { recursive: true }
        );
      });
    }
  } catch (error) {
    log.error('[FATAL] Error encountered while attempting to create predist folder structure: ', error);
    process.exit(1);
  }
}

module.exports = writePredistDir;
