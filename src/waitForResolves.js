import check from 'type-check-system';

export default function waitForResolves(renderProps, store) {
	check(renderProps, { location: Object, components: Array, history: Object });
	check(store, { dispatch: Function, getState: Function });

	const components = renderProps.components;
	const location = renderProps.location;

	const params = {
		dispatch: store.dispatch,
		getState: store.getState,
		history: renderProps.history,
		params: location.params,
		query: location.query,
	};

	return Promise.all(components
		.reduce((resolves, component) => resolves.concat(component.resolves || []), [])
		.map((resolve) => resolve(params)));
}
