var log = require('./log');
var utils = require('../utils');
var constants = require('../constants');
var readRef = require('./readRef');
var transpileFile = require('./transpileFile');
var cloneFile = require('./cloneFile');
var initLoader = require('./initLoader');

var path = require('path');


var writePredistFiles = function (inputDir, outputDir, files, options) {
  try {
    log.process('Building predist..');
    if (files && files.length) {
      var loader = initLoader(options);
      var ref = readRef();

      options[constants.OPTIONS.LOG] && log.extended('# Processing: ');
      files.forEach(function (file) {

        var outputPath = utils.getOutputPath(inputDir, outputDir, file);

        if (utils.isJavascriptFile(file) && 
          (!options[constants.OPTIONS.EXCLUDE] || 
            !options[constants.OPTIONS.EXCLUDE].some(function(regex) {
              return path.resolve(file).match(regex);
            }))) {
          options[constants.OPTIONS.LOG] && log.extended('# (transpiled)  ' + file);
          transpileFile(file, ref, outputPath, loader, options);
        } else {
          if (path.resolve(file).match(/(\.DS_Store)/i)) {
            options[constants.OPTIONS.LOG] && log.extended('# (ommitted)    ' + file);
          } else {
            options[constants.OPTIONS.LOG] && log.extended('# (cloned)      ' + file);
            cloneFile(file, outputPath);
          }
        }
      });
    }
  } catch (error) {
    log.error('[FATAL] Error encountered while attempting to create predist file structure: ', error);
    process.exit(1);
  }
}

module.exports = writePredistFiles;
