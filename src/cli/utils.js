var path = require('path');
var constants = require('./constants');

var utils = {
  isJavascriptFile: function (filePath = '') {
    return path.extname(filePath) === '.js';
  },
  isArray: function (payload) {
    return (payload &&
      typeof payload === 'object' &&
      Array.isArray(payload));
  },
  getInputDir: function (options) {
    return (options && options[constants.OPTIONS.INPUT_DIR]) ? 
      options[constants.OPTIONS.INPUT_DIR] : constants.DEFAULT_INPUT_DIR;
  },
  getOutputDir: function (options) {
    return (options && options[constants.OPTIONS.OUTPUT_DIR]) ? 
      options[constants.OPTIONS.OUTPUT_DIR] : constants.DEFAULT_OUTPUT_DIR;
  },
  getTempOutputDir: function (options) {
    var outDir = (options && options[constants.OPTIONS.OUTPUT_DIR]) ? 
      options[constants.OPTIONS.OUTPUT_DIR] : constants.DEFAULT_OUTPUT_DIR;
    return outDir + constants.DEFAULT_TEMP_DIR;
  },
  getTempOutputPath: function (options) {
    var outDir = (options && options[constants.OPTIONS.OUTPUT_DIR]) ? 
      options[constants.OPTIONS.OUTPUT_DIR] : constants.DEFAULT_OUTPUT_DIR;
    return outDir + constants.DEFAULT_TEMP_DIR + '/' + constants.DEFAULT_TEMP_FILE;
  },
  getOutputPath: function (inputDir, outputDir, file) {
    return path.resolve(outputDir, path.relative(inputDir, file));
  },
  getFiles: function (payload) {
    if (!utils.isArray(payload)) return [];
    return payload.filter(function (p) { return path.extname(p) });
  },
  getFolders: function (payload) {
    if (!utils.isArray(payload)) return [];
    return payload.filter(function (p) { return !path.extname(p) });
  },
  parseArg: function (arg) {
    if (!arg ||
      arg.slice(0, 2) !== '--' ||
      arg.split('=').length !== 2
    ) return {};
    var parsed = arg.slice(2).split('=');
    return {
      key: parsed[0],
      value: (parsed[1] === 'true' || parsed[1] === 'false') ? 
        Boolean(parsed[1]) : parsed[1]
    };
  }
};

module.exports = utils;
