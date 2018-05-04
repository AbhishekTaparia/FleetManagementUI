"use strict";

exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var CustomPropTypes = _interopRequireWildcard(require("./util/PropTypes"));

var Props = _interopRequireWildcard(require("./util/Props"));

var _widgetHelpers = require("./util/widgetHelpers");

var _listDataManager = require("./util/listDataManager");

var _Listbox = _interopRequireDefault(require("./Listbox"));

var _ListOption = _interopRequireDefault(require("./ListOption"));

var _ListOptionGroup = _interopRequireDefault(require("./ListOptionGroup"));

var _messages = require("./messages");

var _jsxFileName = "src/List.js";

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var EMPTY_DATA_STATE = {};
var propTypes = {
  data: _propTypes.default.array,
  dataState: _propTypes.default.shape({
    sortedKeys: _propTypes.default.array,
    groups: _propTypes.default.object,
    data: _propTypes.default.array,
    sequentialData: _propTypes.default.array
  }),
  onSelect: _propTypes.default.func,
  onMove: _propTypes.default.func,
  activeId: _propTypes.default.string,
  optionComponent: CustomPropTypes.elementType,
  renderItem: _propTypes.default.func.isRequired,
  renderGroup: _propTypes.default.func,
  focusedItem: _propTypes.default.any,
  selectedItem: _propTypes.default.any,
  searchTerm: _propTypes.default.string,
  isDisabled: _propTypes.default.func.isRequired,
  groupBy: CustomPropTypes.accessor,
  messages: _propTypes.default.shape({
    emptyList: _propTypes.default.func.isRequired
  })
};
var defaultProps = {
  onSelect: function onSelect() {},
  data: [],
  dataState: EMPTY_DATA_STATE,
  optionComponent: _ListOption.default
};

var List =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(List, _React$Component);

  function List() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = List.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.move();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.move();
  };

  _proto.mapItems = function mapItems(fn) {
    var _props = this.props,
        data = _props.data,
        dataState = _props.dataState;
    var sortedKeys = dataState.sortedKeys,
        groups = dataState.groups;
    if (!groups) return data.map(function (item, idx) {
      return fn(item, idx, false);
    });
    var idx = -1;
    return sortedKeys.reduce(function (items, key) {
      var group = groups[key];
      return items.concat(fn(key, idx, true), group.map(function (item) {
        return fn(item, ++idx, false);
      }));
    }, []);
  };

  _proto.move = function move() {
    var _props2 = this.props,
        focusedItem = _props2.focusedItem,
        onMove = _props2.onMove,
        data = _props2.data,
        dataState = _props2.dataState;
    var list = (0, _reactDom.findDOMNode)(this);
    var idx = renderedIndexOf(focusedItem, list, data, dataState);
    var selectedItem = list.children[idx];
    if (selectedItem) (0, _widgetHelpers.notify)(onMove, [selectedItem, list, focusedItem]);
  };

  _proto.renderGroupHeader = function renderGroupHeader(group) {
    var renderGroup = this.props.renderGroup;
    return _react.default.createElement(_ListOptionGroup.default, {
      key: 'group_' + group,
      group: group,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 92
      },
      __self: this
    }, renderGroup({
      group: group
    }));
  };

  _proto.renderItem = function renderItem(item, index) {
    var _props3 = this.props,
        activeId = _props3.activeId,
        focusedItem = _props3.focusedItem,
        selectedItem = _props3.selectedItem,
        onSelect = _props3.onSelect,
        isDisabled = _props3.isDisabled,
        renderItem = _props3.renderItem,
        searchTerm = _props3.searchTerm,
        Option = _props3.optionComponent;
    var isFocused = focusedItem === item;
    return _react.default.createElement(Option, {
      dataItem: item,
      key: 'item_' + index,
      index: index,
      activeId: activeId,
      focused: isFocused,
      onSelect: onSelect,
      disabled: isDisabled(item),
      selected: selectedItem === item,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 113
      },
      __self: this
    }, renderItem({
      item: item,
      index: index,
      searchTerm: searchTerm
    }));
  };

  _proto.render = function render() {
    var _this = this;

    var _props4 = this.props,
        className = _props4.className,
        messages = _props4.messages;
    var elementProps = Props.pickElementProps(this);

    var _getMessages = (0, _messages.getMessages)(messages),
        emptyList = _getMessages.emptyList;

    return _react.default.createElement(_Listbox.default, _extends({}, elementProps, {
      className: className,
      emptyListMessage: emptyList(this.props),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 135
      },
      __self: this
    }), this.mapItems(function (item, idx, isHeader) {
      return isHeader ? _this.renderGroupHeader(item) : _this.renderItem(item, idx);
    }));
  };

  return List;
}(_react.default.Component);

List.getDataState = _listDataManager.defaultGetDataState;

function renderedIndexOf(item, list, data, dataState) {
  var groups = dataState.groups,
      sortedKeys = dataState.sortedKeys;
  if (!groups) return data.indexOf(item);
  var runningIdx = -1;
  var idx = -1;
  sortedKeys.some(function (group) {
    var itemIdx = groups[group].indexOf(item);
    runningIdx++;

    if (itemIdx !== -1) {
      idx = runningIdx + itemIdx + 1;
      return true;
    }

    runningIdx += groups[group].length;
  });
  return idx;
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;
var _default = List;
exports.default = _default;
module.exports = exports["default"];