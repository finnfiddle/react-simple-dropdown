(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.helpers = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.omit = omit;
  function omit(obj, keys) {
    var result = Object.assign({}, obj);
    keys.forEach(function (key) {
      return delete result[key];
    });
    return result;
  }
});