var fs = require('fs');
var log = require('./log');

var cloneFile = function (file, outputPath) {
  try {
    var output = fs.readFileSync(fs.realpathSync(file));
    fs.writeFileSync(outputPath, output, { flag: 'a' });
  } catch (error) {
    log.error('[FATAL] Error encountered while attempting to clone a file: ', error);
    process.exit(1);
  }
}

module.exports = cloneFile;
