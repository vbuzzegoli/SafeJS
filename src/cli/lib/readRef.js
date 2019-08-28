var fs = require('fs');
var path = require('path');
var log = require('./log');
var constants = require('../constants');

var readRef = function () {
  try {
    return fs.readFileSync(path.resolve(__dirname + '../../../../' + constants.REF_PATH));
  } catch (error) {
    log.error('[FATAL] Error encountered while attempting to read the reference: ', error);
    process.exit(1);
  }
}

module.exports = readRef;
