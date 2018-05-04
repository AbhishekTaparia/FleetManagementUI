"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("./Button"));

var _jsxFileName = "src/MultiselectTag.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var MultiselectTag =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MultiselectTag, _React$Component);

  function MultiselectTag() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this, _this.onClick = function (event) {
      var _this$props = _this.props,
          value = _this$props.value,
          disabled = _this$props.disabled,
          onClick = _this$props.onClick;
      if (!disabled) onClick(value, event);
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = MultiselectTag.prototype;

  _proto.renderDelete = function renderDelete() {
    var _props = this.props,
        label = _props.label,
        disabled = _props.disabled,
        readOnly = _props.readOnly;
    return _react.default.createElement(_Button.default, {
      variant: "select",
      onClick: this.onClick,
      className: "rw-multiselect-tag-btn",
      disabled: disabled || readOnly,
      "aria-label": label || 'Remove item',
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: this
    }, _react.default.createElement("span", {
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      },
      __self: this
    }, "\xD7"));
  };

  _proto.render = function render() {
    var _props2 = this.props,
        id = _props2.id,
        children = _props2.children,
        focused = _props2.focused,
        disabled = _props2.disabled;
    var tabIndex = disabled ? undefined : '-1';
    return _react.default.createElement("li", {
      id: id,
      role: "option",
      tabIndex: tabIndex,
      className: (0, _classnames.default)('rw-multiselect-tag', disabled && 'rw-state-disabled', focused && !disabled && 'rw-state-focus'),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45
      },
      __self: this
    }, children, _react.default.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56
      },
      __self: this
    }, this.renderDelete()));
  };

  return MultiselectTag;
}(_react.default.Component);

MultiselectTag.propTypes = {
  id: _propTypes.default.string,
  onClick: _propTypes.default.func.isRequired,
  focused: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  label: _propTypes.default.string,
  value: _propTypes.default.any
};
var _default = MultiselectTag;
exports.default = _default;
module.exports = exports["default"];