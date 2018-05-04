"use strict";

exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _Input = _interopRequireDefault(require("./Input"));

var _localizers = require("./util/localizers");

var CustomPropTypes = _interopRequireWildcard(require("./util/PropTypes"));

var Props = _interopRequireWildcard(require("./util/Props"));

var _jsxFileName = "src/DateTimePickerInput.js";

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var DateTimePickerInput =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DateTimePickerInput, _React$Component);

  function DateTimePickerInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _initialiseProps.call(_assertThisInitialized(_this));

    var _this$props = _this.props,
        value = _this$props.value,
        editing = _this$props.editing,
        editFormat = _this$props.editFormat,
        format = _this$props.format,
        culture = _this$props.culture;
    _this.state = {
      textValue: formatDate(value, editing && editFormat ? editFormat : format, culture)
    };
    return _this;
  }

  var _proto = DateTimePickerInput.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var value = nextProps.value,
        editing = nextProps.editing,
        editFormat = nextProps.editFormat,
        format = nextProps.format,
        culture = nextProps.culture;
    this.setState({
      textValue: formatDate(value, editing && editFormat ? editFormat : format, culture)
    });
  };

  _proto.focus = function focus() {
    (0, _reactDom.findDOMNode)(this).focus();
  };

  _proto.render = function render() {
    var _props = this.props,
        disabled = _props.disabled,
        readOnly = _props.readOnly;
    var textValue = this.state.textValue;
    var props = Props.omitOwn(this);
    return _react.default.createElement(_Input.default, _extends({}, props, {
      type: "text",
      className: "rw-widget-input",
      value: textValue,
      disabled: disabled,
      readOnly: readOnly,
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 81
      },
      __self: this
    }));
  };

  return DateTimePickerInput;
}(_react.default.Component);

DateTimePickerInput.propTypes = {
  format: CustomPropTypes.dateFormat.isRequired,
  editing: _propTypes.default.bool,
  editFormat: CustomPropTypes.dateFormat,
  parse: _propTypes.default.func.isRequired,
  value: _propTypes.default.instanceOf(Date),
  onChange: _propTypes.default.func.isRequired,
  onBlur: _propTypes.default.func,
  culture: _propTypes.default.string,
  disabled: CustomPropTypes.disabled,
  readOnly: CustomPropTypes.disabled
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleBlur = function (event) {
    var _this2$props = _this2.props,
        format = _this2$props.format,
        culture = _this2$props.culture,
        parse = _this2$props.parse,
        onChange = _this2$props.onChange,
        onBlur = _this2$props.onBlur;
    onBlur && onBlur(event);

    if (_this2._needsFlush) {
      var date = parse(event.target.value);
      _this2._needsFlush = false;
      onChange(date, formatDate(date, format, culture));
    }
  };

  this.handleChange = function (_ref) {
    var value = _ref.target.value;
    _this2._needsFlush = true;

    _this2.setState({
      textValue: value
    });
  };
};

var _default = DateTimePickerInput;
exports.default = _default;

function isValid(d) {
  return !isNaN(d.getTime());
}

function formatDate(date, format, culture) {
  var val = '';
  if (date instanceof Date && isValid(date)) val = _localizers.date.format(date, format, culture);
  return val;
}

module.exports = exports["default"];