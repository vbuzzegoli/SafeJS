var semver = require('semver');
var constants = require('../constants');
var utils = require('../utils');
var log = require('./log');
var clearDir = require('./clearDir');
var readDir = require('./readDir');
var writePredistDir = require('./writePredistDir');
var writePredistFiles = require('./writePredistFiles');
var clearTempDir = require('./clearTempDir');

var transpile = function (options = {}) {
  log.main('SafeJS transpiling..');

  // Node version guard
  if (!semver.satisfies(process.version, '>=' + constants.MIN_NODE_VERSION)) {
    log.error('SafeJS requires node >=' + constants.MIN_NODE_VERSION + ', you have: ' + process.version);
    process.exit(1);
  }

  var inputDir = utils.getInputDir(options);
  var outputDir = utils.getOutputDir(options);
  options[constants.OPTIONS.LOG] && log.info('Input directory: ' + inputDir);
  options[constants.OPTIONS.LOG] && log.info('Output directory: ' + outputDir);

  clearDir(outputDir, inputDir);
  readDir(inputDir, function (err, res) {
    if (err) {
      log.error('[Error] Could not read source directory : ' + err);
      process.exit(1);
    } else {
      var files = utils.getFiles(res);
      var folders = utils.getFolders(res);

      writePredistDir(inputDir, outputDir, folders, options);
      writePredistFiles(inputDir, outputDir, files, options);

      clearTempDir(options);
      log.main('SafeJS transpiled successfully.');
    }
  });
}

module.exports = transpile;
