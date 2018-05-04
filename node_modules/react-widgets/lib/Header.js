"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("./Button"));

var _jsxFileName = "src/Header.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Header =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Header, _React$Component);

  function Header() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Header.prototype;

  _proto.render = function render() {
    var _props = this.props,
        messages = _props.messages,
        label = _props.label,
        labelId = _props.labelId,
        onMoveRight = _props.onMoveRight,
        onMoveLeft = _props.onMoveLeft,
        onViewChange = _props.onViewChange,
        prevDisabled = _props.prevDisabled,
        upDisabled = _props.upDisabled,
        nextDisabled = _props.nextDisabled,
        isRtl = _props.isRtl;
    return _react.default.createElement("div", {
      className: "rw-calendar-header",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      },
      __self: this
    }, _react.default.createElement(_Button.default, {
      className: "rw-calendar-btn-left",
      onClick: onMoveLeft,
      disabled: prevDisabled,
      label: messages.moveBack(),
      icon: "chevron-" + (isRtl ? 'right' : 'left'),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      },
      __self: this
    }), _react.default.createElement(_Button.default, {
      id: labelId,
      onClick: onViewChange,
      className: "rw-calendar-btn-view",
      disabled: upDisabled,
      "aria-live": "polite",
      "aria-atomic": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 49
      },
      __self: this
    }, label), _react.default.createElement(_Button.default, {
      className: "rw-calendar-btn-right",
      onClick: onMoveRight,
      disabled: nextDisabled,
      label: messages.moveForward(),
      icon: "chevron-" + (isRtl ? 'left' : 'right'),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59
      },
      __self: this
    }));
  };

  return Header;
}(_react.default.Component);

Header.contextTypes = {};
Header.propTypes = {
  label: _propTypes.default.string.isRequired,
  labelId: _propTypes.default.string,
  upDisabled: _propTypes.default.bool.isRequired,
  prevDisabled: _propTypes.default.bool.isRequired,
  nextDisabled: _propTypes.default.bool.isRequired,
  onViewChange: _propTypes.default.func.isRequired,
  onMoveLeft: _propTypes.default.func.isRequired,
  onMoveRight: _propTypes.default.func.isRequired,
  messages: _propTypes.default.shape({
    moveBack: _propTypes.default.func.isRequired,
    moveForward: _propTypes.default.func.isRequired
  }),
  isRtl: _propTypes.default.bool
};
var _default = Header;
exports.default = _default;
module.exports = exports["default"];