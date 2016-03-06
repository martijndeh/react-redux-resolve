'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Sandwich = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

exports.fetchSandwich = fetchSandwich;

var _react = require('react');

var _resolve = require('./../../resolve.js');

var _resolve2 = _interopRequireDefault(_resolve);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function fetchSandwich() {
	return function (dispatch) {
		dispatch({
			type: 'FETCH_SANDWICH_STARTED'
		});

		(0, _nodeFetch2.default)('http://example.com/api/sandwich').then(function (response) {
			return response.json();
		}).then(function (sandwich) {
			dispatch({
				type: 'FETCH_SANDWICH_SUCCEEDED',
				sandwich: sandwich
			});
		});
	};
};

var Sandwich = exports.Sandwich = (_dec = (0, _resolve2.default)(function (_ref) {
	var dispatch = _ref.dispatch;
	return dispatch(fetchSandwich());
}), _dec(_class = function (_Component) {
	_inherits(Sandwich, _Component);

	function Sandwich() {
		_classCallCheck(this, Sandwich);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Sandwich).apply(this, arguments));
	}

	_createClass(Sandwich, [{
		key: 'render',
		value: function render() {
			var sandwich = this.props.sandwich;


			return React.createElement(
				'div',
				null,
				React.createElement(
					'h1',
					null,
					sandwich.name
				)
			);
		}
	}]);

	return Sandwich;
}(_react.Component)) || _class);