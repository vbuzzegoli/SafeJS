var log = require('./log');
var writeTemp = require('./writeTemp');
var transpileTemp = require('./transpileTemp');
var clearTemp = require('./clearTemp');

var transpileFile = function (file, ref, outputPath, loader, options) {
  try {
    writeTemp(ref, file, options);
    transpileTemp(outputPath, loader, options);
    clearTemp(options);
  } catch (error) {
    log.error('[FATAL] Error encountered while attempting to transpile a file: ', error);
    process.exit(1);
  }
}

module.exports = transpileFile;
