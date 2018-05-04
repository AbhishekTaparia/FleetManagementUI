"use strict";

exports.__esModule = true;
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _uncontrollable = _interopRequireDefault(require("uncontrollable"));

var _List = _interopRequireDefault(require("./List"));

var _Popup = _interopRequireDefault(require("./Popup"));

var _Input = _interopRequireDefault(require("./Input"));

var _Select = _interopRequireDefault(require("./Select"));

var _Widget = _interopRequireDefault(require("./Widget"));

var _WidgetPicker = _interopRequireDefault(require("./WidgetPicker"));

var _messages = require("./messages");

var _focusManager = _interopRequireDefault(require("./util/focusManager"));

var _listDataManager = _interopRequireDefault(require("./util/listDataManager"));

var CustomPropTypes = _interopRequireWildcard(require("./util/PropTypes"));

var _accessorManager = _interopRequireDefault(require("./util/accessorManager"));

var _scrollManager = _interopRequireDefault(require("./util/scrollManager"));

var Props = _interopRequireWildcard(require("./util/Props"));

var _interaction = require("./util/interaction");

var _widgetHelpers = require("./util/widgetHelpers");

var _AutocompleteListItem = _interopRequireDefault(require("./AutocompleteListItem"));

var _class,
    _descriptor,
    _descriptor2,
    _class2,
    _temp,
    _jsxFileName = "src/Autocomplete.js";

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var propTypes = {
  //-- controlled props -----------
  value: PropTypes.any,
  onChange: PropTypes.func,
  open: PropTypes.bool,
  onToggle: PropTypes.func,
  //------------------------------------
  openWithoutData: PropTypes.bool,
  itemComponent: CustomPropTypes.elementType,
  selectComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,
  groupComponent: CustomPropTypes.elementType,
  groupBy: CustomPropTypes.accessor,
  data: PropTypes.array,
  valueField: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  onKeyDown: PropTypes.func,
  onSelect: PropTypes.func,
  autoFocus: PropTypes.bool,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,
  busy: PropTypes.bool,
  delay: PropTypes.number,
  dropUp: PropTypes.bool,
  popupTransition: CustomPropTypes.elementType,
  placeholder: PropTypes.string,
  inputProps: PropTypes.object,
  listProps: PropTypes.object,
  isRtl: PropTypes.bool,
  messages: PropTypes.shape({
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message
  })
};
var Autocomplete = (_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Autocomplete, _React$Component);

  function Autocomplete(props, context) {
    var _this;

    _this = _React$Component.call(this, props, context) || this;

    _this.handleFocusChanged = function (focused) {
      if (!focused) _this.close();
    };

    _initializerDefineProperty(_this, "handleSelect", _descriptor, _assertThisInitialized(_this));

    _this.handleInputChange = function (event) {
      _this.change(event.target.value, event);

      _this.open();
    };

    _initializerDefineProperty(_this, "handleKeyDown", _descriptor2, _assertThisInitialized(_this));

    _this.attachListRef = function (ref) {
      _this.listRef = ref;
    };

    _this.attachInputRef = function (ref) {
      _this.inputRef = ref;
    };

    _this.canOpen = function () {
      return !!_this.props.value && (_this.props.openWithoutData || !!_this.props.data.length);
    };

    _this.messages = (0, _messages.getMessages)(props.messages);
    _this.inputId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_this), '_input');
    _this.listId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_this), '_listbox');
    _this.activeId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_this), '_listbox_active_option');
    _this.list = (0, _listDataManager.default)(_assertThisInitialized(_this));
    _this.accessors = (0, _accessorManager.default)(_assertThisInitialized(_this));
    _this.handleScroll = (0, _scrollManager.default)(_assertThisInitialized(_this));
    _this.focusManager = (0, _focusManager.default)(_assertThisInitialized(_this), {
      didHandle: _this.handleFocusChanged
    });
    _this.state = _extends({}, _this.getStateFromProps(props), {
      open: false
    });
    return _this;
  }

  var _proto = Autocomplete.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.messages = (0, _messages.getMessages)(nextProps.messages);
    this.setState(this.getStateFromProps(nextProps));
  };

  _proto.getStateFromProps = function getStateFromProps(props) {
    var accessors = this.accessors,
        list = this.list;
    var value = props.value,
        data = props.data;

    var _ref = this.state || {},
        _ref$focusedItem = _ref.focusedItem,
        focusedItem = _ref$focusedItem === void 0 ? null : _ref$focusedItem;

    var index = accessors.indexOf(data, value);
    list.setData(data);
    return {
      data: data,
      selectedItem: list.nextEnabled(data[index]),
      focusedItem: ~index ? list.nextEnabled(data[index]) : focusedItem
    };
  };

  _proto.renderList = function renderList(messages) {
    var activeId = this.activeId,
        inputId = this.inputId,
        listId = this.listId,
        accessors = this.accessors;
    var _props = this.props,
        open = _props.open,
        value = _props.value;
    var _state = this.state,
        selectedItem = _state.selectedItem,
        focusedItem = _state.focusedItem;
    var List = this.props.listComponent;
    var props = this.list.defaultProps();
    return _react.default.createElement(List, _extends({}, props, {
      id: listId,
      activeId: activeId,
      ref: this.attachListRef,
      valueAccessor: accessors.value,
      textAccessor: accessors.text,
      selectedItem: selectedItem,
      searchTerm: accessors.text(value) || '',
      focusedItem: open ? focusedItem : null,
      "aria-hidden": !open,
      "aria-labelledby": inputId,
      "aria-live": open && 'polite',
      onSelect: this.handleSelect,
      onMove: this.handleScroll,
      messages: messages,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 195
      },
      __self: this
    }));
  };

  _proto.render = function render() {
    var _this2 = this;

    var _props2 = this.props,
        className = _props2.className,
        popupTransition = _props2.popupTransition,
        data = _props2.data,
        value = _props2.value,
        busy = _props2.busy,
        dropUp = _props2.dropUp,
        open = _props2.open,
        autoFocus = _props2.autoFocus,
        placeholder = _props2.placeholder,
        inputProps = _props2.inputProps,
        SelectComponent = _props2.selectComponent;
    var focused = this.state.focused;
    var disabled = this.props.disabled === true;
    var readOnly = this.props.readOnly === true;
    var elementProps = Props.pickElementProps(this);
    var shouldRenderPopup = open || (0, _widgetHelpers.isFirstFocusedRender)(this);
    var messages = this.messages;
    var valueItem = this.accessors.findOrSelf(data, value);
    var actuallyOpen = open && this.canOpen();
    return _react.default.createElement(_Widget.default, _extends({}, elementProps, {
      dropUp: dropUp,
      focused: focused,
      disabled: disabled,
      readOnly: readOnly,
      open: actuallyOpen,
      onBlur: this.focusManager.handleBlur,
      onFocus: this.focusManager.handleFocus,
      onKeyDown: this.handleKeyDown,
      className: (0, _classnames.default)(className, 'rw-autocomplete'),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 243
      },
      __self: this
    }), _react.default.createElement(_WidgetPicker.default, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 255
      },
      __self: this
    }, _react.default.createElement(_Input.default, _extends({}, inputProps, {
      role: "combobox",
      id: this.inputId,
      autoFocus: autoFocus,
      nodeRef: this.attachInputRef,
      disabled: disabled === true,
      readOnly: readOnly === true,
      "aria-busy": !!busy,
      "aria-owns": this.listId,
      "aria-autocomplete": "list",
      "aria-activedescendant": open ? this.activeId : null,
      "aria-expanded": open,
      "aria-haspopup": true,
      placeholder: placeholder,
      value: this.accessors.text(valueItem),
      onChange: this.handleInputChange,
      onKeyDown: this.handleInputKeyDown,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 256
      },
      __self: this
    })), _react.default.createElement(SelectComponent, {
      busy: busy,
      "aria-hidden": "true",
      role: "presentational",
      disabled: disabled || readOnly,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 275
      },
      __self: this
    })), shouldRenderPopup && _react.default.createElement(_Popup.default, {
      dropUp: dropUp,
      open: actuallyOpen,
      transition: popupTransition,
      onEntering: function onEntering() {
        return _this2.listRef.forceUpdate();
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 284
      },
      __self: this
    }, _react.default.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 290
      },
      __self: this
    }, this.renderList(messages))));
  };

  _proto.focus = function focus() {
    this.inputRef && this.inputRef.focus();
  };

  _proto.change = function change(nextValue, originalEvent) {
    var _props3 = this.props,
        onChange = _props3.onChange,
        lastValue = _props3.value;
    (0, _widgetHelpers.notify)(onChange, [nextValue, {
      lastValue: lastValue,
      originalEvent: originalEvent
    }]);
  };

  _proto.open = function open() {
    if (!this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, true);
  };

  _proto.close = function close() {
    var _this3 = this;

    this.setState({
      focusedItem: null
    }, function () {
      (0, _widgetHelpers.notify)(_this3.props.onToggle, false);
    });
  };

  return Autocomplete;
}(_react.default.Component), _class2.defaultProps = {
  data: [],
  open: false,
  openWithoutData: false,
  listComponent: _List.default,
  selectComponent: _Select.default,
  itemComponent: _AutocompleteListItem.default
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "handleSelect", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (data, originalEvent) {
      _this4.close();

      (0, _widgetHelpers.notify)(_this4.props.onSelect, [data, {
        originalEvent: originalEvent
      }]);

      _this4.change(data, originalEvent);

      _this4.focus();
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "handleKeyDown", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (e) {
      var key = e.key,
          list = _this5.list,
          focusedItem = _this5.state.focusedItem,
          isOpen = _this5.props.open;
      (0, _widgetHelpers.notify)(_this5.props.onKeyDown, [e]);
      if (e.defaultPrevented) return;

      if (!isOpen) {
        if (key === 'ArrowDown') _this5.open();
        return;
      }

      if (key === 'End') {
        e.preventDefault();

        _this5.setState({
          focusedItem: list.last()
        });
      } else if (key === 'Home') {
        e.preventDefault();

        _this5.setState({
          focusedItem: list.first()
        });
      } else if (key === 'Escape') _this5.close();else if (key === 'Enter') {
        if (!focusedItem) {
          return void _this5.close();
        }

        e.preventDefault();

        _this5.handleSelect(focusedItem, e);

        _this5.change(focusedItem, false, e);
      } else if (key === 'ArrowDown') {
        e.preventDefault();

        _this5.setState({
          focusedItem: list.next(focusedItem)
        });
      } else if (key === 'ArrowUp') {
        e.preventDefault();

        _this5.setState({
          focusedItem: list.prev(focusedItem)
        });
      }
    };
  }
})), _class);
Autocomplete.propTypes = propTypes;

var _default = (0, _uncontrollable.default)(Autocomplete, {
  open: 'onToggle',
  value: 'onChange'
}, ['focus']);

exports.default = _default;
module.exports = exports["default"];