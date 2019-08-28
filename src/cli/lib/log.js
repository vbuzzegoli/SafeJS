var COLORS = {
  GREEN: '32',
  YELLOW: '33',
  PURPLE: '34',
  GRAY: '90',
  RED: '91'
}

function output(message, color, payload) {
  if (!console || !message) return;
  if (color) {
    !payload && console.log('\x1B[' + color + 'm' + message + '\x1B[39m');
    payload && console.log('\x1B[' + color + 'm' + message + '\x1B[39m', payload);
  } else {
    !payload && console.log(message);
    payload && console.log(message, payload);
  }

}

var log = {
  main: function (message, payload) {
    output(message, COLORS.GREEN, payload);
  },
  info: function (message, payload) {
    output(message, COLORS.YELLOW, payload);
  },
  process: function (message, payload) {
    output(message, COLORS.PURPLE, payload);
  },
  extended: function (message, payload) {
    output(message, COLORS.GRAY, payload);
  },
  error: function (message, payload) {
    output(message, COLORS.RED, payload);
  },
  default: function (message, payload) {
    output(message, undefined, payload);
  }
}

module.exports = log;
