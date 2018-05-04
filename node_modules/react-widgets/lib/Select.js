"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = _interopRequireDefault(require("./Button"));

var _jsxFileName = "src/Select.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Select =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Select, _React$Component);

  function Select() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Select.prototype;

  _proto.render = function render() {
    var _props = this.props,
        className = _props.className,
        bordered = _props.bordered,
        children = _props.children,
        props = _objectWithoutProperties(_props, ["className", "bordered", "children"]);

    return _react.default.createElement("span", {
      className: (0, _classnames.default)(className, 'rw-select', bordered && 'rw-select-bordered'),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    }, children ? _react.default.Children.map(children, function (child) {
      return child && _react.default.cloneElement(child, {
        variant: 'select'
      });
    }) : _react.default.createElement(_Button.default, _extends({}, props, {
      variant: "select",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      },
      __self: this
    })));
  };

  return Select;
}(_react.default.Component);

Select.propTypes = {
  bordered: _propTypes.default.bool
};
var _default = Select;
exports.default = _default;
module.exports = exports["default"];