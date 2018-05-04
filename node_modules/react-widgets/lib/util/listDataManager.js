"use strict";

exports.__esModule = true;
exports.normalizeComponent = normalizeComponent;
exports.defaultGetDataState = defaultGetDataState;
exports.default = listDataManager;

var _react = _interopRequireDefault(require("react"));

var _reactComponentManagers = require("react-component-managers");

var _Filter = require("./Filter");

var _ = require("./_");

var _accessorManager = _interopRequireDefault(require("./accessorManager"));

var _jsxFileName = "src/util/listDataManager.js";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var EMPTY_VALUE = {};

function normalizeComponent(Component) {
  return function (itemProps) {
    return Component ? _react.default.createElement(Component, _extends({}, itemProps, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      },
      __self: this
    })) : itemProps.text || itemProps.item;
  };
}

function defaultGetDataState(data, _ref, lastState) {
  var groupBy = _ref.groupBy;

  if (lastState === void 0) {
    lastState = {};
  }

  if (lastState.data !== data || lastState.groupBy !== groupBy) {
    if (!groupBy) return {};
    var keys = [];
    var groups = (0, _.groupBySortedKeys)(groupBy, data, keys);
    return {
      data: data,
      groupBy: groupBy,
      groups: groups,
      sortedKeys: keys,
      sequentialData: Object.keys(groups).reduce(function (flat, grp) {
        return flat.concat(groups[grp]);
      }, [])
    };
  }

  return lastState;
}

function defaultGetStateGetterFromList(_ref2) {
  var listComponent = _ref2.listComponent;
  return listComponent && listComponent.getDataState;
}

function listDataManager(component, _temp) {
  var _ref3 = _temp === void 0 ? {} : _temp,
      getDataState = _ref3.getDataState,
      getStateGetterFromProps = _ref3.getStateGetterFromProps,
      _ref3$accessors = _ref3.accessors,
      accessors = _ref3$accessors === void 0 ? (0, _accessorManager.default)(component) : _ref3$accessors;

  var listData;
  var listState;
  var needsUpdate = true;
  var currentProps = component.props;
  if (getDataState) getStateGetterFromProps = null;else {
    if (!getStateGetterFromProps) getStateGetterFromProps = defaultGetStateGetterFromList;
    getDataState = getStateGetterFromProps(currentProps) || defaultGetDataState;
  }
  (0, _reactComponentManagers.spyOnComponent)(component, {
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if (!needsUpdate) needsUpdate = nextProps !== currentProps;
      currentProps = nextProps;

      if (needsUpdate && getStateGetterFromProps) {
        getDataState = getStateGetterFromProps(currentProps) || defaultGetDataState;
      }
    },
    componentWillUnmount: function componentWillUnmount() {
      listData = null;
      listState = null;
      currentProps = null;
      getDataState = null;
      getStateGetterFromProps = null;
    }
  });

  function isDisabled(item) {
    var disabled = currentProps.disabled;
    if (!Array.isArray(disabled)) return false;
    return disabled.some(function (disabled) {
      return accessors.value(item) === accessors.value(disabled);
    });
  }

  function getMatcher(word) {
    if (!word) return function () {
      return true;
    };
    word = word.toLowerCase();
    return function (item) {
      return _Filter.presets.startsWith(accessors.text(item).toLowerCase(), word);
    };
  }

  function getSequentialData() {
    var state = manager.getState();
    return state && state.sequentialData || listData;
  } // eslint-disable-next-line react/prop-types


  var renderItem = function renderItem(_ref4) {
    var item = _ref4.item,
        rest = _objectWithoutProperties(_ref4, ["item"]);

    var Component = currentProps.itemComponent;
    return Component ? _react.default.createElement(Component, _extends({
      item: item,
      value: accessors.value(item),
      text: accessors.text(item),
      disabled: isDisabled(item)
    }, rest, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 108
      },
      __self: this
    })) : accessors.text(item);
  }; // eslint-disable-next-line react/prop-types


  var renderGroup = function renderGroup(_ref5) {
    var group = _ref5.group;
    var Component = currentProps.groupComponent;
    return Component ? _react.default.createElement(Component, {
      item: group,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 123
      },
      __self: this
    }) : group;
  };

  var manager = {
    isDisabled: isDisabled,
    first: function first() {
      return manager.next(EMPTY_VALUE);
    },
    last: function last() {
      var data = getSequentialData();
      return manager.prevEnabled(data[data.length - 1]);
    },
    prevEnabled: function prevEnabled(item) {
      return isDisabled(item) ? manager.prev(item) : item;
    },
    prev: function prev(item, word) {
      var data = getSequentialData();
      var matches = getMatcher(word);
      var nextIdx = data.indexOf(item);
      if (nextIdx < 0 || nextIdx == null) nextIdx = 0;
      nextIdx--;

      while (nextIdx > -1 && (isDisabled(data[nextIdx]) || !matches(data[nextIdx]))) {
        nextIdx--;
      }

      if (nextIdx >= 0) return data[nextIdx];
      if (!manager.isDisabled(item)) return item;
    },
    next: function next(item, word) {
      var data = getSequentialData();
      var matches = getMatcher(word);
      var nextIdx = data.indexOf(item) + 1;
      var len = data.length;

      while (nextIdx < len && (isDisabled(data[nextIdx]) || !matches(data[nextIdx]))) {
        nextIdx++;
      }

      if (nextIdx < len) return data[nextIdx];
      if (!manager.isDisabled(item)) return item;
    },
    nextEnabled: function nextEnabled(item) {
      return isDisabled(item) ? manager.next(item) : item;
    },
    setData: function setData(data) {
      if (!needsUpdate) needsUpdate = data !== listData;
      listData = data;
    },
    getState: function getState() {
      if (needsUpdate) {
        needsUpdate = false;
        listState = getDataState(listData, currentProps, listState);
      }

      return listState;
    },
    defaultProps: function defaultProps() {
      var _currentProps = currentProps,
          groupBy = _currentProps.groupBy,
          optionComponent = _currentProps.optionComponent,
          searchTerm = _currentProps.searchTerm;
      return _extends({
        groupBy: groupBy,
        renderItem: renderItem,
        renderGroup: renderGroup,
        searchTerm: searchTerm,
        optionComponent: optionComponent,
        isDisabled: isDisabled
      }, currentProps.listProps, {
        data: listData,
        dataState: manager.getState()
      });
    }
  };
  return manager;
}