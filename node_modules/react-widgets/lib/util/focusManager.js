"use strict";

exports.__esModule = true;
exports.default = createFocusManager;

var _reactComponentManagers = require("react-component-managers");

var _interaction = require("./interaction");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function createFocusManager(component, options) {
  var _didHandle = options.didHandle;
  return (0, _reactComponentManagers.focusManager)(component, _extends({}, options, {
    onChange: function onChange(focused) {
      component.setState({
        focused: focused
      });
    },
    isDisabled: function isDisabled() {
      return (0, _interaction.isInDisabledFieldset)(component) || component.props.disabled === true;
    },
    didHandle: function didHandle(focused, event) {
      var handler = this.props[focused ? 'onFocus' : 'onBlur'];
      handler && handler(event);
      if (_didHandle && !event.isWidgetDefaultPrevented) _didHandle(focused, event);
    }
  }));
}

module.exports = exports["default"];