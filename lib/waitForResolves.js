'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = waitForResolves;

var _typeCheckSystem = require('type-check-system');

var _typeCheckSystem2 = _interopRequireDefault(_typeCheckSystem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function waitForResolves(renderProps, store) {
	(0, _typeCheckSystem2.default)(renderProps, { location: Object, components: Array, history: Object });
	(0, _typeCheckSystem2.default)(store, { dispatch: Function, getState: Function });

	var components = renderProps.components;
	var location = renderProps.location;

	var params = {
		dispatch: store.dispatch,
		getState: store.getState,
		history: renderProps.history,
		params: location.params,
		query: location.query
	};

	return Promise.all(components.filter(function (component) {
		return !!component;
	}).reduce(function (resolves, component) {
		return resolves.concat(component.resolves || []);
	}, []).map(function (resolve) {
		return resolve(params);
	}));
}