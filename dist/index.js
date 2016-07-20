(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-dom', 'lodash.uniqueid', './dropdownTrigger', './dropdownContent', './helpers'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-dom'), require('lodash.uniqueid'), require('./dropdownTrigger'), require('./dropdownContent'), require('./helpers'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactDom, global.lodash, global.dropdownTrigger, global.dropdownContent, global.helpers);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _reactDom, _lodash, _dropdownTrigger, _dropdownContent, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DropdownContent = exports.DropdownTrigger = undefined;

  var _react2 = _interopRequireDefault(_react);

  var _lodash2 = _interopRequireDefault(_lodash);

  var _dropdownTrigger2 = _interopRequireDefault(_dropdownTrigger);

  var _dropdownContent2 = _interopRequireDefault(_dropdownContent);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

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

  var Dropdown = function (_Component) {
    _inherits(Dropdown, _Component);

    function Dropdown() {
      _classCallCheck(this, Dropdown);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dropdown).call(this));

      // unique id used for closing when another dropdown gets clicked
      _this.uid = (0, _lodash2.default)('react_super_dropdown_');
      _this.displayName = 'SuperDropdown';
      _this.state = { active: false };
      _this._handleWindowClick = _this.handleWindowClick.bind(_this);
      _this._handleDropdownTriggerClick = _this.handleDropdownTriggerClick.bind(_this);
      return _this;
    }

    _createClass(Dropdown, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        // bind event listeners
        window.addEventListener('click', this._handleWindowClick);
        window.addEventListener('super_dropdown_trigger_click', this._handleDropdownTriggerClick);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        // clean up events listeners
        window.removeEventListener('click', this._handleWindowClick);
        window.removeEventListener('super_dropdown_trigger_click', this._handleDropdownTriggerClick);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        // is dropdown open
        var isActive = this.isActive();

        var trigger = null;
        var content = null;

        _react2.default.Children.forEach(this.props.children, function (child) {
          // bind toggle hadnler to trigger child
          if (child.type === _dropdownTrigger2.default) {
            trigger = (0, _react.cloneElement)(child, {
              ref: 'trigger',
              onClick: _this2.handleToggleClick.bind(_this2)
            });
          }
          // else render menu if is open
          else if (child.type === _dropdownContent2.default && isActive) {
              content = child;
            }
        });

        // custom tagName can be used. default is div
        return _react2.default.createElement(
          this.props.tagName,
          _extends({}, (0, _helpers.omit)(this.props, ['openClassName', 'tagName', 'children', 'active']), {
            className: this.props.className + ' ' + (isActive ? this.props.openClassName : '')
          }),
          trigger,
          content
        );
      }
    }, {
      key: 'isActive',
      value: function isActive() {
        return typeof this.props.active === 'boolean' ? this.props.active : this.state.active;
      }
    }, {
      key: 'hide',
      value: function hide() {
        this.setState({ active: false });
        if (this.props.onHide) this.props.onHide();
      }
    }, {
      key: 'show',
      value: function show() {
        this.setState({ active: true });
        if (this.props.onShow) this.props.onShow();
      }
    }, {
      key: 'handleWindowClick',
      value: function handleWindowClick(event) {
        var dropdownElement = (0, _reactDom.findDOMNode)(this);
        if (event.target !== dropdownElement && !dropdownElement.contains(event.target) && this.isActive()) {
          this.hide();
        }
      }
    }, {
      key: 'handleToggleClick',
      value: function handleToggleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        this.closeOtherDropdowns(this.uid);
        if (this.isActive()) this.hide();else this.show();
      }
    }, {
      key: 'handleDropdownTriggerClick',
      value: function handleDropdownTriggerClick(event) {
        if (typeof event.detail !== 'undefined' && event.detail !== this.uid) this.hide();
      }
    }, {
      key: 'closeOtherDropdowns',
      value: function closeOtherDropdowns() {
        var event = new CustomEvent('super_dropdown_trigger_click', { detail: this.uid });
        window.dispatchEvent(event);
      }
    }]);

    return Dropdown;
  }(_react.Component);

  Dropdown.propTypes = {
    openClassName: _react.PropTypes.string,
    tagName: _react.PropTypes.string
  };

  Dropdown.defaultProps = {
    openClassName: 'open',
    tagName: 'div'
  };

  exports.DropdownTrigger = _dropdownTrigger2.default;
  exports.DropdownContent = _dropdownContent2.default;
  exports.default = Dropdown;
});