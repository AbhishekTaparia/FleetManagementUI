"use strict";

exports.__esModule = true;
exports.default = createAccessorManager;

var _reactComponentManagers = require("react-component-managers");

var helpers = _interopRequireWildcard(require("./dataHelpers"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function createAccessorManager(component) {
  var _component$props = component.props,
      textField = _component$props.textField,
      valueField = _component$props.valueField;
  (0, _reactComponentManagers.spyOnComponent)(component, {
    componentWillReceiveProps: function componentWillReceiveProps(props) {
      textField = props.textField;
      valueField = props.valueField;
    }
  });
  return {
    text: function text(item) {
      return helpers.dataText(item, textField);
    },
    value: function value(item) {
      return helpers.dataValue(item, valueField);
    },
    indexOf: function indexOf(data, item) {
      return helpers.dataIndexOf(data, item, valueField);
    },
    matches: function matches(a, b) {
      return helpers.valueMatcher(a, b, valueField);
    },
    findOrSelf: function findOrSelf(data, item) {
      return helpers.dataItem(data, item, valueField);
    },
    find: function find(data, item) {
      var idx = helpers.dataIndexOf(data, item, valueField);

      if (~idx) {
        return data[idx];
      }
    }
  };
}

module.exports = exports["default"];