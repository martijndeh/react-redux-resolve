'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _sandwich = require('./components/sandwich.js');

var _nock = require('nock');

var _nock2 = _interopRequireDefault(_nock);

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middlewares = [_reduxThunk2.default];
var mockStore = (0, _reduxMockStore2.default)(middlewares);

function setup() {
	var props = {};

	var renderer = _reactAddonsTestUtils2.default.createRenderer();
	renderer.render(React.createElement(_sandwich.Sandwich, null));
	var output = renderer.getRenderOutput();

	return {
		props: props,
		output: output,
		renderer: renderer
	};
}

describe('resolve', function () {
	afterEach(function () {
		return _nock2.default.cleanAll();
	});

	it('initial test', function (done) {
		(0, _nock2.default)('http://example.com').get('/api/sandwich').reply(200, { id: 1, name: 'The Cheesesteak' });

		var expectedActions = [{ type: 'FETCH_SANDWICH_STARTED' }, { type: 'FETCH_SANDWICH_SUCCEEDED', sandwich: { id: 1, name: 'The Cheesesteak' } }];

		var store = mockStore({}, expectedActions, done);

		store.dispatch((0, _sandwich.fetchSandwich)());
	});

	it('component did mount', function () {
		var called = false;
		var sandwich = new _sandwich.Sandwich();
		sandwich.context = {
			store: {
				getState: function getState() {},
				dispatch: function dispatch() {
					called = true;
				}
			}
		};
		sandwich.props = {
			history: {},
			location: {},
			params: {}
		};
		sandwich.componentDidMount();

		_assert2.default.equal(called, true);
	});
});