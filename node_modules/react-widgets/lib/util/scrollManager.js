"use strict";

exports.__esModule = true;
exports.default = createScrollManager;

var _scrollTo = _interopRequireDefault(require("dom-helpers/util/scrollTo"));

var _reactComponentManagers = require("react-component-managers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createScrollManager(component, getScrollParent) {
  if (getScrollParent === void 0) {
    getScrollParent = function getScrollParent(list) {
      return list.parentNode;
    };
  }

  var currentFocused, currentVisible, cancelScroll;
  var onMove = component.props.onMove;
  var mounted = true;
  (0, _reactComponentManagers.spyOnComponent)(component, {
    componentWillReceiveProps: function componentWillReceiveProps(_ref) {
      var nextOnMove = _ref.onMove;
      onMove = nextOnMove;
    },
    componentWillUnmount: function componentWillUnmount() {
      mounted = false;
    }
  });
  return function (selected, list, nextFocused) {
    if (!mounted) return;
    var lastVisible = currentVisible;
    var lastItem = currentFocused;
    var shown, changed;
    currentVisible = !(!list.offsetWidth || !list.offsetHeight);
    currentFocused = nextFocused;
    changed = lastItem !== nextFocused;
    shown = currentVisible && !lastVisible;

    if (shown || currentVisible && changed) {
      if (onMove) onMove(selected, list, nextFocused);else {
        cancelScroll && cancelScroll();
        cancelScroll = (0, _scrollTo.default)(selected, false && getScrollParent(list));
      }
    }
  };
}

module.exports = exports["default"];