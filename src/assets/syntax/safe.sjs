syntax safe = function (ctx) {
  return #`(((function () { try { return ${ctx}; } catch (e) {}}).bind(this))())`
};
