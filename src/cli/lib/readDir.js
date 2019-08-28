var glob = require('glob');
var log = require('./log');

function readSourceDir(src, cb) {
  try {
    glob(src + '/**/*', cb);
  } catch (error) {
    log.error('[FATAL] Error encountered while attempting to read the source directory: ', error);
    process.exit(1);
  }
};

module.exports = readSourceDir;
