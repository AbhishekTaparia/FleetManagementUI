"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _dates = _interopRequireDefault(require("./util/dates"));

var _jsxFileName = "src/CalendarView.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var VIEW_UNITS = ['month', 'year', 'decade', 'century'];

function clamp(date, min, max) {
  return _dates.default.max(_dates.default.min(date, max), min);
}

var CalendarView =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(CalendarView, _React$Component);

  function CalendarView() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = CalendarView.prototype;

  _proto.render = function render() {
    var _props = this.props,
        className = _props.className,
        activeId = _props.activeId,
        props = _objectWithoutProperties(_props, ["className", "activeId"]);

    return _react.default.createElement("table", _extends({}, props, {
      role: "grid",
      tabIndex: "-1",
      "aria-activedescendant": activeId || null,
      className: (0, _classnames.default)(className, 'rw-nav-view', 'rw-calendar-grid'),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      },
      __self: this
    }));
  };

  return CalendarView;
}(_react.default.Component);

CalendarView.propTypes = {
  activeId: _propTypes.default.string
};

var CalendarViewCell =
/*#__PURE__*/
function (_React$Component2) {
  _inheritsLoose(CalendarViewCell, _React$Component2);

  function CalendarViewCell() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _React$Component2.call.apply(_React$Component2, [this].concat(args)) || this, _this.handleChange = function () {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          min = _this$props.min,
          max = _this$props.max,
          date = _this$props.date;
      onChange(clamp(date, min, max));
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto2 = CalendarViewCell.prototype;

  _proto2.isEmpty = function isEmpty() {
    var _props2 = this.props,
        unit = _props2.unit,
        min = _props2.min,
        max = _props2.max,
        date = _props2.date;
    return !_dates.default.inRange(date, min, max, unit);
  };

  _proto2.isEqual = function isEqual(date) {
    return _dates.default.eq(this.props.date, date, this.props.unit);
  };

  _proto2.isFocused = function isFocused() {
    return !this.props.disabled && !this.isEmpty() && this.isEqual(this.props.focused);
  };

  _proto2.isNow = function isNow() {
    return this.props.now && this.isEqual(this.props.now);
  };

  _proto2.isOffView = function isOffView() {
    var _props3 = this.props,
        viewUnit = _props3.viewUnit,
        focused = _props3.focused,
        date = _props3.date;
    return date && focused && viewUnit && _dates.default[viewUnit](date) !== _dates.default[viewUnit](focused);
  };

  _proto2.isSelected = function isSelected() {
    return this.props.selected && this.isEqual(this.props.selected);
  };

  _proto2.render = function render() {
    var _props4 = this.props,
        children = _props4.children,
        activeId = _props4.activeId,
        label = _props4.label,
        disabled = _props4.disabled;
    var isDisabled = disabled || this.isEmpty();
    return _react.default.createElement("td", {
      role: "gridcell",
      id: this.isFocused() ? activeId : null,
      title: label,
      "aria-label": label,
      "aria-readonly": disabled,
      "aria-selected": this.isSelected(),
      onClick: !isDisabled ? this.handleChange : undefined,
      className: (0, _classnames.default)('rw-cell', this.isNow() && 'rw-now', isDisabled && 'rw-state-disabled', this.isEmpty() && 'rw-cell-not-allowed', this.isOffView() && 'rw-cell-off-range', this.isFocused() && 'rw-state-focus', this.isSelected() && 'rw-state-selected'),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 100
      },
      __self: this
    }, children);
  };

  return CalendarViewCell;
}(_react.default.Component);

CalendarViewCell.propTypes = {
  id: _propTypes.default.string,
  activeId: _propTypes.default.string.isRequired,
  label: _propTypes.default.string,
  now: _propTypes.default.instanceOf(Date),
  date: _propTypes.default.instanceOf(Date),
  selected: _propTypes.default.instanceOf(Date),
  focused: _propTypes.default.instanceOf(Date),
  min: _propTypes.default.instanceOf(Date),
  max: _propTypes.default.instanceOf(Date),
  unit: _propTypes.default.oneOf(['day'].concat(VIEW_UNITS)),
  viewUnit: _propTypes.default.oneOf(VIEW_UNITS),
  onChange: _propTypes.default.func.isRequired,
  disabled: _propTypes.default.bool
};

CalendarView.Body = function (props) {
  return _react.default.createElement("tbody", _extends({
    className: "rw-calendar-body"
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 124
    },
    __self: this
  }));
};

CalendarView.Row = function (props) {
  return _react.default.createElement("tr", _extends({
    role: "row",
    className: "rw-calendar-row"
  }, props, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 125
    },
    __self: this
  }));
};

CalendarView.Cell = CalendarViewCell;
var _default = CalendarView;
exports.default = _default;
module.exports = exports["default"];