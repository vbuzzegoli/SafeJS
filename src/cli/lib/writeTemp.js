var path = require('path');
var fs = require('fs');
var log = require('./log');
var utils = require('../utils');

var writeTemp = function (ref, file, options) {
  try {
    var temp = fs.readFileSync(fs.realpathSync(file));
    fs.writeFileSync(path.resolve(utils.getTempOutputPath(options)), ref, { encoding: 'utf8', flag: 'w' });
    fs.appendFileSync(path.resolve(utils.getTempOutputPath(options)), temp, { encoding: 'utf8' });
  } catch (error) {
    log.error('[FATAL] Error encountered while attempting to write temporary source: ', error);
    process.exit(1);
  }
}

module.exports = writeTemp;
