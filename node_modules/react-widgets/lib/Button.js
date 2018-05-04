"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _jsxFileName = "src/Button.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Button =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Button, _React$Component);

  function Button() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Button.prototype;

  _proto.render = function render() {
    var _props = this.props,
        className = _props.className,
        disabled = _props.disabled,
        label = _props.label,
        icon = _props.icon,
        busy = _props.busy,
        active = _props.active,
        children = _props.children,
        _props$variant = _props.variant,
        variant = _props$variant === void 0 ? 'primary' : _props$variant,
        _props$component = _props.component,
        Tag = _props$component === void 0 ? 'button' : _props$component,
        props = _objectWithoutProperties(_props, ["className", "disabled", "label", "icon", "busy", "active", "children", "variant", "component"]);

    var type = props.type;
    if (Tag === 'button') type = type || 'button';
    return _react.default.createElement(Tag, _extends({}, props, {
      tabIndex: "-1",
      title: label,
      type: type,
      disabled: disabled,
      "aria-disabled": disabled,
      "aria-label": label,
      className: (0, _classnames.default)(className, 'rw-btn', active && !disabled && 'rw-state-active', variant && 'rw-btn-' + variant),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      },
      __self: this
    }), (icon || busy) && _react.default.createElement("span", {
      "aria-hidden": "true",
      className: (0, _classnames.default)('rw-i', "rw-i-" + icon, busy && 'rw-loading'),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      },
      __self: this
    }), children);
  };

  return Button;
}(_react.default.Component);

Button.propTypes = {
  disabled: _propTypes.default.bool,
  label: _propTypes.default.string,
  icon: _propTypes.default.string,
  busy: _propTypes.default.bool,
  active: _propTypes.default.bool,
  variant: _propTypes.default.oneOf(['primary', 'select']),
  component: _propTypes.default.any
};
var _default = Button;
exports.default = _default;
module.exports = exports["default"];