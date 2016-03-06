'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.default = resolve;

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getDisplayName = function getDisplayName(wrapped) {
	return wrapped.displayName || wrapped.name || 'Component';
};

function resolve(resolver) {
	return function (WrappedComponent) {
		var ResolveComponent = function (_WrappedComponent) {
			_inherits(ResolveComponent, _WrappedComponent);

			function ResolveComponent() {
				_classCallCheck(this, ResolveComponent);

				return _possibleConstructorReturn(this, Object.getPrototypeOf(ResolveComponent).apply(this, arguments));
			}

			_createClass(ResolveComponent, [{
				key: 'componentDidMount',
				value: function componentDidMount() {
					resolver({
						dispatch: this.context.store.dispatch,
						getState: this.context.store.getState,
						history: this.props.history,
						params: this.props.params,
						query: this.props.query
					});

					if (_get(Object.getPrototypeOf(ResolveComponent.prototype), 'componentDidMount', this)) {
						_get(Object.getPrototypeOf(ResolveComponent.prototype), 'componentDidMount', this).call(this);
					}
				}
			}]);

			return ResolveComponent;
		}(WrappedComponent);

		ResolveComponent.contextTypes = _extends({}, WrappedComponent.contextTypes, {
			store: _react.PropTypes.object.isRequired
		});

		ResolveComponent.displayName = 'Resolve(' + getDisplayName(WrappedComponent) + ')';
		ResolveComponent.resolves = [resolver].concat(_toConsumableArray(WrappedComponent.resolves || []));
		return (0, _hoistNonReactStatics2.default)(ResolveComponent, WrappedComponent);
	};
}