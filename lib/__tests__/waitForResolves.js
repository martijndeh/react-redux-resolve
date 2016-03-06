'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _waitForResolves = require('../waitForResolves.js');

var _waitForResolves2 = _interopRequireDefault(_waitForResolves);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emptyRenderProps = { location: { params: {}, query: {} }, components: [], history: {} };
var emptyStore = { dispatch: function dispatch() {}, getState: function getState() {} };

describe('waitForResolves', function () {
	it('null arguments', function () {
		_assert2.default.throws(function () {
			return (0, _waitForResolves2.default)(null, null);
		}, Error);
	});

	it('invalid store, valid renderProps', function () {
		_assert2.default.throws(function () {
			return (0, _waitForResolves2.default)(emptyRenderProps, null);
		}, Error);
	});

	it('valid params, returns promise', function () {
		var ret = (0, _waitForResolves2.default)(emptyRenderProps, emptyStore);
		_assert2.default.equal(_typeof(ret.then), 'function');
	});

	it('renderProps with 1 resolve', function () {
		var called = false;
		var renderProps = _extends({}, emptyRenderProps, {
			components: [{
				resolves: [function (_ref) {
					var dispatch = _ref.dispatch;
					var getState = _ref.getState;
					var history = _ref.history;
					var params = _ref.params;
					var query = _ref.query;

					_assert2.default.equal(typeof dispatch === 'undefined' ? 'undefined' : _typeof(dispatch), 'function');
					_assert2.default.equal(typeof getState === 'undefined' ? 'undefined' : _typeof(getState), 'function');
					_assert2.default.equal(typeof history === 'undefined' ? 'undefined' : _typeof(history), 'object');
					_assert2.default.equal(typeof params === 'undefined' ? 'undefined' : _typeof(params), 'object');
					_assert2.default.equal(typeof query === 'undefined' ? 'undefined' : _typeof(query), 'object');

					called = true;
				}]
			}]
		});

		return (0, _waitForResolves2.default)(renderProps, emptyStore).then(function () {
			_assert2.default.equal(called, true);
		});
	});
});