(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', './helpers'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('./helpers'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.helpers);
    global.DropdownTrigger = mod.exports;
  }
})(this, function (exports, _react, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var DropdownTrigger = function (_Component) {
    _inherits(DropdownTrigger, _Component);

    function DropdownTrigger() {
      _classCallCheck(this, DropdownTrigger);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DropdownTrigger).call(this));

      _this.displayName = 'DropdownTrigger';
      return _this;
    }

    _createClass(DropdownTrigger, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          this.props.tagName,
          (0, _helpers.omit)(this.props, ['tagName', 'children']),
          this.props.children
        );
      }
    }]);

    return DropdownTrigger;
  }(_react.Component);

  DropdownTrigger.propTypes = {
    onClick: _react.PropTypes.func,
    tagName: _react.PropTypes.string
  };

  DropdownTrigger.defaultProps = {
    tagName: 'a'
  };

  exports.default = DropdownTrigger;
});