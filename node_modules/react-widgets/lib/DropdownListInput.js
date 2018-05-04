"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var CustomPropTypes = _interopRequireWildcard(require("./util/PropTypes"));

var _dataHelpers = require("./util/dataHelpers");

var _jsxFileName = "src/DropdownListInput.js";

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DropdownListInput =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DropdownListInput, _React$Component);

  function DropdownListInput() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = DropdownListInput.prototype;

  _proto.render = function render() {
    var _props = this.props,
        placeholder = _props.placeholder,
        value = _props.value,
        textField = _props.textField,
        Component = _props.valueComponent;
    return _react.default.createElement("div", {
      className: "rw-input rw-dropdown-list-input",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      },
      __self: this
    }, !value && placeholder ? _react.default.createElement("span", {
      className: "rw-placeholder",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      },
      __self: this
    }, placeholder) : Component ? _react.default.createElement(Component, {
      item: value,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: this
    }) : (0, _dataHelpers.dataText)(value, textField));
  };

  return DropdownListInput;
}(_react.default.Component);

DropdownListInput.propTypes = {
  value: _propTypes.default.any,
  placeholder: _propTypes.default.string,
  textField: CustomPropTypes.accessor,
  valueComponent: CustomPropTypes.elementType
};
var _default = DropdownListInput;
exports.default = _default;
module.exports = exports["default"];