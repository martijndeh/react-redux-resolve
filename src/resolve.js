import hoistStatics from 'hoist-non-react-statics';
import { PropTypes } from 'react';

const getDisplayName = (wrapped) => wrapped.displayName || wrapped.name || 'Component';

export default function resolve(resolver) {
	return (WrappedComponent) => {
		class ResolveComponent extends WrappedComponent {
			componentDidMount() {
				resolver({
					dispatch: this.context.store.dispatch,
					getState: this.context.store.getState,
					history: this.props.history,
					params: this.props.params,
					query: this.props.query,
				});

				if (super.componentDidMount) {
					super.componentDidMount();
				}
			}
		}

		ResolveComponent.contextTypes = {
			...WrappedComponent.contextTypes,
			store: PropTypes.object.isRequired
		};

		ResolveComponent.displayName = `Resolve(${getDisplayName(WrappedComponent)})`;
		ResolveComponent.resolves = [resolver, ...WrappedComponent.resolves || []];
		return hoistStatics(ResolveComponent, WrappedComponent);
	};
}
