"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabItem = exports.Tab = exports.Top = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _globalStyle = _interopRequireDefault(require("../../assets/global-style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  height: 100%;\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  height: 44px;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  background: ", ";\n  a {\n    flex: 1;\n    padding: 2px 0;\n    font-size: 14px;\n    color: #e4e4e4;\n    &.selected {\n      span {\n        padding: 3px 0;\n        font-weight: 700;\n        color: #f1f1f1;\n        border-bottom: 2px solid #f1f1f1;\n      }\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  padding: 5px 10px;\n  background: ", ";\n  &>span {\n    line-height: 40px;\n    color: #f1f1f1;\n    font-size: 20px;\n    &.iconfont {\n      font-size: 25px;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Top = _styledComponents["default"].div(_templateObject(), _globalStyle["default"]["theme-color"]);

exports.Top = Top;

var Tab = _styledComponents["default"].div(_templateObject2(), _globalStyle["default"]["theme-color"]);

exports.Tab = Tab;

var TabItem = _styledComponents["default"].div(_templateObject3());

exports.TabItem = TabItem;