var NodeLoader = require('@sweet-js/core/dist/node-loader').default;
var constants = require('../constants.js');

var initLoader = function (options) {
  return new NodeLoader(process.cwd(), {
    noBabel: options[constants.OPTIONS.NO_BABEL],
    logging: options[constants.OPTIONS.OUTPUT_DIR]
  });
};

module.exports = initLoader;
