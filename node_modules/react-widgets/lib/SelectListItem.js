"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ListOption = _interopRequireDefault(require("./ListOption"));

var _jsxFileName = "src/SelectListItem.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var SelectListItem =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(SelectListItem, _React$Component);

  function SelectListItem() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this, _this.handleChange = function (e) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          disabled = _this$props.disabled,
          dataItem = _this$props.dataItem;
      if (!disabled) onChange(dataItem, e.target.checked);
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = SelectListItem.prototype;

  _proto.render = function render() {
    var _props = this.props,
        children = _props.children,
        disabled = _props.disabled,
        readOnly = _props.readOnly,
        name = _props.name,
        type = _props.type,
        checked = _props.checked,
        onMouseDown = _props.onMouseDown,
        props = _objectWithoutProperties(_props, ["children", "disabled", "readOnly", "name", "type", "checked", "onMouseDown"]);

    delete props.onChange;
    return _react.default.createElement(_ListOption.default, _extends({}, props, {
      role: type,
      disabled: disabled,
      "aria-checked": !!checked,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      },
      __self: this
    }), _react.default.createElement("label", {
      onMouseDown: onMouseDown,
      className: "rw-select-list-label",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 46
      },
      __self: this
    }, _react.default.createElement("input", {
      name: name,
      type: type,
      tabIndex: "-1",
      checked: checked,
      disabled: disabled || !!readOnly,
      role: "presentation",
      className: "rw-select-list-input",
      onChange: this.handleChange,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      },
      __self: this
    }), children));
  };

  return SelectListItem;
}(_react.default.Component);

SelectListItem.propTypes = {
  type: _propTypes.default.string.isRequired,
  name: _propTypes.default.string.isRequired,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  dataItem: _propTypes.default.any,
  checked: _propTypes.default.bool.isRequired,
  onChange: _propTypes.default.func.isRequired,
  onMouseDown: _propTypes.default.func.isRequired
};
var _default = SelectListItem;
exports.default = _default;
module.exports = exports["default"];