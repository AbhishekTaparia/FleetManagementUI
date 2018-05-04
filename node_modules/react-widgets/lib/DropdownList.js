"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _activeElement = _interopRequireDefault(require("dom-helpers/activeElement"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactComponentManagers = require("react-component-managers");

var _uncontrollable = _interopRequireDefault(require("uncontrollable"));

var _Widget = _interopRequireDefault(require("./Widget"));

var _WidgetPicker = _interopRequireDefault(require("./WidgetPicker"));

var _Select = _interopRequireDefault(require("./Select"));

var _Popup = _interopRequireDefault(require("./Popup"));

var _List = _interopRequireDefault(require("./List"));

var _AddToListOption = _interopRequireDefault(require("./AddToListOption"));

var _DropdownListInput = _interopRequireDefault(require("./DropdownListInput"));

var _messages = require("./messages");

var Props = _interopRequireWildcard(require("./util/Props"));

var Filter = _interopRequireWildcard(require("./util/Filter"));

var _focusManager = _interopRequireDefault(require("./util/focusManager"));

var _listDataManager = _interopRequireDefault(require("./util/listDataManager"));

var CustomPropTypes = _interopRequireWildcard(require("./util/PropTypes"));

var _accessorManager = _interopRequireDefault(require("./util/accessorManager"));

var _scrollManager = _interopRequireDefault(require("./util/scrollManager"));

var _interaction = require("./util/interaction");

var _widgetHelpers = require("./util/widgetHelpers");

var _class,
    _descriptor,
    _descriptor2,
    _descriptor3,
    _descriptor4,
    _descriptor5,
    _class2,
    _temp,
    _jsxFileName = "src/DropdownList.js";

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

var CREATE_OPTION = {};
/**
 * ---
 * shortcuts:
 *   - { key: alt + down arrow, label: open dropdown }
 *   - { key: alt + up arrow, label: close dropdown }
 *   - { key: down arrow, label: move focus to next item }
 *   - { key: up arrow, label: move focus to previous item }
 *   - { key: home, label: move focus to first item }
 *   - { key: end, label: move focus to last item }
 *   - { key: enter, label: select focused item }
 *   - { key: ctrl + enter, label: create new option from current searchTerm }
 *   - { key: any key, label: search list for item starting with key }
 * ---
 *
 * A `<select>` replacement for single value lists.

 * @public
 */

var DropdownList = (_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DropdownList, _React$Component);

  function DropdownList() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleFocusChanged = function (focused) {
      if (!focused) _this.close();
    };

    _initializerDefineProperty(_this, "handleSelect", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "handleCreate", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "handleClick", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "handleKeyDown", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "handleKeyPress", _descriptor5, _assertThisInitialized(_this));

    _this.handleInputChange = function (e) {
      _this.search(e.target.value, e, 'input');
    };

    _this.attachInputRef = function (ref) {
      return _this.inputRef = ref;
    };

    _this.attachFilterRef = function (ref) {
      return _this.filterRef = ref;
    };

    _this.attachListRef = function (ref) {
      return _this.listRef = ref;
    };

    _this.focus = function (target) {
      var _this$props = _this.props,
          filter = _this$props.filter,
          open = _this$props.open;
      var inst = target || (filter && open ? _this.filterRef : _this.inputRef);
      inst = (0, _reactDom.findDOMNode)(inst);
      if (inst && (0, _activeElement.default)() !== inst) inst.focus();
    };

    (0, _reactComponentManagers.autoFocus)(_assertThisInitialized(_this));
    _this.messages = (0, _messages.getMessages)(_this.props.messages);
    _this.inputId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_this), '_input');
    _this.listId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_this), '_listbox');
    _this.activeId = (0, _widgetHelpers.instanceId)(_assertThisInitialized(_this), '_listbox_active_option');
    _this.list = (0, _listDataManager.default)(_assertThisInitialized(_this));
    _this.mounted = (0, _reactComponentManagers.mountManager)(_assertThisInitialized(_this));
    _this.timeouts = (0, _reactComponentManagers.timeoutManager)(_assertThisInitialized(_this));
    _this.accessors = (0, _accessorManager.default)(_assertThisInitialized(_this));
    _this.handleScroll = (0, _scrollManager.default)(_assertThisInitialized(_this));
    _this.focusManager = (0, _focusManager.default)(_assertThisInitialized(_this), {
      didHandle: _this.handleFocusChanged
    });
    _this.state = _this.getStateFromProps(_this.props);
    return _this;
  }

  var _proto = DropdownList.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.messages = (0, _messages.getMessages)(nextProps.messages);
    this.setState(this.getStateFromProps(nextProps));
  };

  _proto.getStateFromProps = function getStateFromProps(props) {
    var open = props.open,
        value = props.value,
        data = props.data,
        searchTerm = props.searchTerm,
        filter = props.filter,
        minLength = props.minLength,
        caseSensitive = props.caseSensitive;
    var accessors = this.accessors,
        list = this.list;
    var initialIdx = accessors.indexOf(data, value);
    if (open) data = Filter.filter(data, {
      filter: filter,
      searchTerm: searchTerm,
      minLength: minLength,
      caseSensitive: caseSensitive,
      textField: this.accessors.text
    });
    list.setData(data);
    var selectedItem = data[initialIdx];
    return {
      data: data,
      selectedItem: list.nextEnabled(selectedItem),
      focusedItem: list.nextEnabled(selectedItem || data[0])
    };
  };

  _proto.change = function change(nextValue, originalEvent) {
    var _props = this.props,
        onChange = _props.onChange,
        searchTerm = _props.searchTerm,
        lastValue = _props.value;

    if (!this.accessors.matches(nextValue, lastValue)) {
      (0, _widgetHelpers.notify)(onChange, [nextValue, {
        originalEvent: originalEvent,
        lastValue: lastValue,
        searchTerm: searchTerm
      }]);
      this.clearSearch(originalEvent);
      this.close();
    }
  };

  _proto.renderList = function renderList(messages) {
    var _props2 = this.props,
        open = _props2.open,
        filter = _props2.filter,
        data = _props2.data,
        searchTerm = _props2.searchTerm;
    var _state = this.state,
        selectedItem = _state.selectedItem,
        focusedItem = _state.focusedItem;
    var _accessors = this.accessors,
        value = _accessors.value,
        text = _accessors.text;
    var List = this.props.listComponent;
    var props = this.list.defaultProps();
    return _react.default.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 342
      },
      __self: this
    }, filter && _react.default.createElement(_WidgetPicker.default, {
      className: "rw-filter-input rw-input",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 344
      },
      __self: this
    }, _react.default.createElement("input", {
      value: searchTerm,
      className: "rw-input-reset",
      onChange: this.handleInputChange,
      placeholder: messages.filterPlaceholder(this.props),
      ref: this.attachFilterRef,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 347
      },
      __self: this
    }), _react.default.createElement(_Select.default, {
      icon: "search",
      role: "presentation",
      "aria-hidden": "true",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 354
      },
      __self: this
    })), _react.default.createElement(List, _extends({}, props, {
      id: this.listId,
      activeId: this.activeId,
      valueAccessor: value,
      textAccessor: text,
      selectedItem: selectedItem,
      focusedItem: open ? focusedItem : null,
      onSelect: this.handleSelect,
      onMove: this.handleScroll,
      "aria-live": open && 'polite',
      "aria-labelledby": this.inputId,
      "aria-hidden": !this.props.open,
      ref: this.attachListRef,
      messages: {
        emptyList: data.length ? messages.emptyFilter : messages.emptyList
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 357
      },
      __self: this
    })), this.allowCreate() && _react.default.createElement(_AddToListOption.default, {
      id: this.createId,
      searchTerm: searchTerm,
      onSelect: this.handleCreate,
      focused: !focusedItem || focusedItem === CREATE_OPTION,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 376
      },
      __self: this
    }, messages.createOption(this.props)));
  };

  _proto.render = function render() {
    var _this2 = this;

    var _props3 = this.props,
        className = _props3.className,
        tabIndex = _props3.tabIndex,
        popupTransition = _props3.popupTransition,
        textField = _props3.textField,
        data = _props3.data,
        busy = _props3.busy,
        dropUp = _props3.dropUp,
        placeholder = _props3.placeholder,
        value = _props3.value,
        open = _props3.open,
        filter = _props3.filter,
        inputProps = _props3.inputProps,
        valueComponent = _props3.valueComponent;
    var focused = this.state.focused;
    var disabled = this.props.disabled === true,
        readOnly = this.props.readOnly === true,
        valueItem = this.accessors.findOrSelf(data, value);
    var shouldRenderPopup = open || (0, _widgetHelpers.isFirstFocusedRender)(this);

    var elementProps = _extends(Props.pickElementProps(this), {
      name: undefined,
      role: 'combobox',
      id: this.inputId,
      tabIndex: open && filter ? -1 : tabIndex || 0,
      'aria-owns': this.listId,
      'aria-activedescendant': open ? this.activeId : null,
      'aria-expanded': !!open,
      'aria-haspopup': true,
      'aria-busy': !!busy,
      'aria-live': !open && 'polite',
      'aria-autocomplete': 'list',
      'aria-disabled': disabled,
      'aria-readonly': readOnly
    });

    var messages = this.messages;
    return _react.default.createElement(_Widget.default, _extends({}, elementProps, {
      open: open,
      dropUp: dropUp,
      focused: focused,
      disabled: disabled,
      readOnly: readOnly,
      onBlur: this.focusManager.handleBlur,
      onFocus: this.focusManager.handleFocus,
      onKeyDown: this.handleKeyDown,
      onKeyPress: this.handleKeyPress,
      className: (0, _classnames.default)(className, 'rw-dropdown-list'),
      ref: this.attachInputRef,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 433
      },
      __self: this
    }), _react.default.createElement(_WidgetPicker.default, {
      onClick: this.handleClick,
      className: "rw-widget-input",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 447
      },
      __self: this
    }, _react.default.createElement(_DropdownListInput.default, _extends({}, inputProps, {
      value: valueItem,
      textField: textField,
      placeholder: placeholder,
      valueComponent: valueComponent,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 448
      },
      __self: this
    })), _react.default.createElement(_Select.default, {
      busy: busy,
      icon: "caret-down",
      role: "presentational",
      "aria-hidden": "true",
      disabled: disabled || readOnly,
      label: messages.openDropdown(this.props),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 455
      },
      __self: this
    })), shouldRenderPopup && _react.default.createElement(_Popup.default, {
      open: open,
      dropUp: dropUp,
      transition: popupTransition,
      onEntered: function onEntered() {
        return _this2.focus();
      },
      onEntering: function onEntering() {
        return _this2.listRef.forceUpdate();
      },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 465
      },
      __self: this
    }, this.renderList(messages)));
  };

  _proto.findOption = function findOption(character, cb) {
    var _this3 = this;

    var word = ((this._currentWord || '') + character).toLowerCase();
    if (!character) return;
    this._currentWord = word;
    this.timeouts.set('search', function () {
      var list = _this3.list,
          key = _this3.props.open ? 'focusedItem' : 'selectedItem',
          item = list.next(_this3.state[key], word);

      if (item === _this3.state[key]) {
        item = list.next(null, word);
      }

      _this3._currentWord = '';
      if (item) cb(item);
    }, this.props.delay);
  };

  _proto.clearSearch = function clearSearch(originalEvent) {
    this.search('', originalEvent, 'clear');
  };

  _proto.search = function search(searchTerm, originalEvent, action) {
    if (action === void 0) {
      action = 'input';
    }

    var _props4 = this.props,
        onSearch = _props4.onSearch,
        lastSearchTerm = _props4.searchTerm;
    if (searchTerm !== lastSearchTerm) (0, _widgetHelpers.notify)(onSearch, [searchTerm, {
      action: action,
      lastSearchTerm: lastSearchTerm,
      originalEvent: originalEvent
    }]);
  };

  _proto.open = function open() {
    if (!this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, true);
  };

  _proto.close = function close() {
    if (this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, false);
  };

  _proto.toggle = function toggle() {
    this.props.open ? this.close() : this.open();
  };

  _proto.allowCreate = function allowCreate() {
    var _props5 = this.props,
        searchTerm = _props5.searchTerm,
        onCreate = _props5.onCreate,
        allowCreate = _props5.allowCreate;
    return !!(onCreate && (allowCreate === true || allowCreate === 'onFilter' && searchTerm) && !this.hasExtactMatch());
  };

  _proto.hasExtactMatch = function hasExtactMatch() {
    var _props6 = this.props,
        searchTerm = _props6.searchTerm,
        caseSensitive = _props6.caseSensitive,
        filter = _props6.filter;
    var data = this.state.data;
    var text = this.accessors.text;

    var lower = function lower(text) {
      return caseSensitive ? text : text.toLowerCase();
    }; // if there is an exact match on textFields:


    return filter && data.some(function (v) {
      return lower(text(v)) === lower(searchTerm);
    });
  };

  return DropdownList;
}(_react.default.Component), _class2.propTypes = _extends({}, Filter.propTypes, {
  value: _propTypes.default.any,

  /**
  * @type {function (
  *  dataItems: ?any,
  *  metadata: {
  *    lastValue: ?any,
  *    searchTerm: ?string
  *    originalEvent: SyntheticEvent,
  *  }
  * ): void}
  */
  onChange: _propTypes.default.func,
  open: _propTypes.default.bool,
  onToggle: _propTypes.default.func,
  data: _propTypes.default.array,
  valueField: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  allowCreate: _propTypes.default.oneOf([true, false, 'onFilter']),

  /**
   * A React component for customizing the rendering of the DropdownList
   * value
   */
  valueComponent: CustomPropTypes.elementType,
  itemComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,
  groupComponent: CustomPropTypes.elementType,
  groupBy: CustomPropTypes.accessor,

  /**
   *
   * @type {(dataItem: ?any, metadata: { originalEvent: SyntheticEvent }) => void}
   */
  onSelect: _propTypes.default.func,
  onCreate: _propTypes.default.func,

  /**
   * @type function(searchTerm: string, metadata: { action, lastSearchTerm, originalEvent? })
   */
  onSearch: _propTypes.default.func,
  searchTerm: _propTypes.default.string,
  busy: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  dropUp: _propTypes.default.bool,
  popupTransition: CustomPropTypes.elementType,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,
  inputProps: _propTypes.default.object,
  listProps: _propTypes.default.object,
  isRtl: _propTypes.default.bool,
  messages: _propTypes.default.shape({
    open: _propTypes.default.string,
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message,
    filterPlaceholder: _propTypes.default.string,
    createOption: CustomPropTypes.message
  })
}), _class2.defaultProps = {
  data: [],
  delay: 500,
  searchTerm: '',
  allowCreate: false,
  listComponent: _List.default
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "handleSelect", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (dataItem, originalEvent) {
      if (dataItem === undefined || dataItem === CREATE_OPTION) {
        _this4.handleCreate(_this4.props.searchTerm);

        return;
      }

      (0, _widgetHelpers.notify)(_this4.props.onSelect, [dataItem, {
        originalEvent: originalEvent
      }]);

      _this4.change(dataItem, originalEvent);

      _this4.close();

      _this4.focus(_this4);
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "handleCreate", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (searchTerm, event) {
      if (searchTerm === void 0) {
        searchTerm = '';
      }

      (0, _widgetHelpers.notify)(_this5.props.onCreate, searchTerm);

      _this5.clearSearch(event);

      _this5.close();

      _this5.focus(_this5);
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "handleClick", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (e) {
      _this6.focus();

      _this6.toggle();

      (0, _widgetHelpers.notify)(_this6.props.onClick, e);
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "handleKeyDown", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function (e) {
      var key = e.key,
          altKey = e.altKey,
          ctrlKey = e.ctrlKey;
      var list = _this7.list;
      var _this7$props = _this7.props,
          open = _this7$props.open,
          onKeyDown = _this7$props.onKeyDown,
          filter = _this7$props.filter,
          searchTerm = _this7$props.searchTerm;
      var _this7$state = _this7.state,
          focusedItem = _this7$state.focusedItem,
          selectedItem = _this7$state.selectedItem;
      var createIsFocused = focusedItem === CREATE_OPTION;

      var canCreate = _this7.allowCreate();

      (0, _widgetHelpers.notify)(onKeyDown, [e]);

      var closeWithFocus = function closeWithFocus() {
        _this7.close();

        (0, _reactDom.findDOMNode)(_this7).focus();
      };

      var change = function change(item) {
        return item != null && _this7.change(item, e);
      };

      var focusItem = function focusItem(item) {
        return _this7.setState({
          focusedItem: item
        });
      };

      if (e.defaultPrevented) return;

      if (key === 'End') {
        e.preventDefault();
        if (open) focusItem(list.last());else change(list.last());
      } else if (key === 'Home') {
        e.preventDefault();
        if (open) focusItem(list.first());else change(list.first());
      } else if (key === 'Escape' && open) {
        e.preventDefault();
        closeWithFocus();
      } else if (key === 'Enter' && open && ctrlKey && canCreate) {
        e.preventDefault();

        _this7.handleCreate(searchTerm, e);
      } else if ((key === 'Enter' || key === ' ' && !filter) && open) {
        e.preventDefault();

        _this7.handleSelect(focusedItem, e);
      } else if (key === ' ' && !open) {
        e.preventDefault();

        _this7.open();
      } else if (key === 'ArrowDown') {
        e.preventDefault();
        if (altKey) return _this7.open();
        if (!open) change(list.next(selectedItem));
        var next = list.next(focusedItem);
        var creating = createIsFocused || canCreate && focusedItem === next;
        focusItem(creating ? CREATE_OPTION : next);
      } else if (key === 'ArrowUp') {
        e.preventDefault();
        if (altKey) return closeWithFocus();
        if (!open) return change(list.prev(selectedItem));
        focusItem(createIsFocused ? list.last() : list.prev(focusedItem));
      }
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "handleKeyPress", [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this8 = this;

    return function (e) {
      (0, _widgetHelpers.notify)(_this8.props.onKeyPress, [e]);
      if (e.defaultPrevented) return;
      if (!(_this8.props.filter && _this8.props.open)) _this8.findOption(String.fromCharCode(e.which), function (item) {
        _this8.mounted() && _this8.props.open ? _this8.setState({
          focusedItem: item
        }) : item && _this8.change(item, e);
      });
    };
  }
})), _class);

var _default = (0, _uncontrollable.default)(DropdownList, {
  open: 'onToggle',
  value: 'onChange',
  searchTerm: 'onSearch'
}, ['focus']);

exports.default = _default;
module.exports = exports["default"];