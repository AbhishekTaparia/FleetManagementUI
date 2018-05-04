"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _MultiselectTag = _interopRequireDefault(require("./MultiselectTag"));

var CustomPropTypes = _interopRequireWildcard(require("./util/PropTypes"));

var _dataHelpers = require("./util/dataHelpers");

var _jsxFileName = "src/MultiselectTagList.js";

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

// disabled === true || [1, 2, 3, etc]
var isDisabled = function isDisabled(item, list, value) {
  return !!(Array.isArray(list) ? ~(0, _dataHelpers.dataIndexOf)(list, item, value) : list);
};

var MultiselectTagList =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MultiselectTagList, _React$Component);

  function MultiselectTagList() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this, _this.handleDelete = function (item, event) {
      if (_this.props.disabled !== true) _this.props.onDelete(item, event);
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = MultiselectTagList.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _props = this.props,
        id = _props.id,
        value = _props.value,
        activeId = _props.activeId,
        valueAccessor = _props.valueAccessor,
        textAccessor = _props.textAccessor,
        label = _props.label,
        disabled = _props.disabled,
        focusedItem = _props.focusedItem,
        ValueComponent = _props.valueComponent;
    return _react.default.createElement("ul", {
      id: id,
      tabIndex: "-1",
      role: "listbox",
      "aria-label": label,
      className: "rw-multiselect-taglist",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 50
      },
      __self: this
    }, value.map(function (item, i) {
      var isFocused = focusedItem === item;
      return _react.default.createElement(_MultiselectTag.default, {
        key: i,
        id: isFocused ? activeId : null,
        value: item,
        focused: isFocused,
        onClick: _this2.handleDelete,
        disabled: isDisabled(item, disabled, valueAccessor),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        },
        __self: this
      }, ValueComponent ? _react.default.createElement(ValueComponent, {
        item: item,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        },
        __self: this
      }) : _react.default.createElement("span", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        },
        __self: this
      }, textAccessor(item)));
    }));
  };

  return MultiselectTagList;
}(_react.default.Component);

MultiselectTagList.propTypes = {
  id: _propTypes.default.string.isRequired,
  activeId: _propTypes.default.string.isRequired,
  label: _propTypes.default.string,
  value: _propTypes.default.array,
  focusedItem: _propTypes.default.any,
  valueAccessor: _propTypes.default.func.isRequired,
  textAccessor: _propTypes.default.func.isRequired,
  onDelete: _propTypes.default.func.isRequired,
  valueComponent: _propTypes.default.func,
  disabled: CustomPropTypes.disabled.acceptsArray
};
var _default = MultiselectTagList;
exports.default = _default;
module.exports = exports["default"];