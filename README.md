# React Redux Resolve
[![Build Status](https://travis-ci.org/martijndeh/react-redux-resolve.svg?branch=master)](https://travis-ci.org/martijndeh/react-redux-resolve)
[![Coverage Status](https://coveralls.io/repos/github/martijndeh/react-redux-resolve/badge.svg?branch=master)](https://coveralls.io/github/martijndeh/react-redux-resolve?branch=master)

Experimental library to universally resolve your component's initial data. Per component you can specify a `resolver`. On the client side, the `resolver` is executed in `componentDidMount()` and on the server-side once you call `waitForResolves(renderProps, store)`. This makes server-side rendering easy to implement!

```js
import { resolve } from 'react-redux-resolve';

@resolve(({ dispatch }) => dispatch(fetchSandwich()))
class MyComponent extends Component {
	render() {
		const { sandwich } = this.props;

		return (
			<Sandwich sandwich={sandwich} />
		);
	}
}
```

Where `fetchSandwich()` is something like the below (please note the example doesn't handle errors). This requires the [redux-thunk](https://www.npmjs.com/package/redux-thunk) middleware:

```js
function fetchSandwich() {
	return (dispatch) => {
		dispatch({
			type: 'FETCH_SANDWICH_STARTED',
			sandwich: sandwich
		});

		return fetch('http://example.com/api/sandwich')
			.then((response) => response.json())
			.then((sandwich) => {				
				dispatch({
					type: 'FETCH_SANDWICH_SUCCEEDED',
					sandwich: sandwich
				});
			});
	};
}
```

Now, say you're rendering your app on the server, you can easily access the `@resolve()`. You can do this by accessing `.resolves` on the components. We've created a helper method called `waitForResolves(renderProps, store)` to do this:

```js
import { waitForResolves } from 'react-redux-resolve';

// Set up your server-side rendering like you normally would do.

match({ routes, location }, (error, redirectLocation, renderProps) => {
	if (redirectLocation) {
		// TODO: 3xx
	}
	else if (error) {
		// TODO: handle error
	}
	else if (!renderProps) {
		// TODO: 404
	}
	else {
		// Here we call the helper method `waitForResolves`. It calls
		// all your components's resolve methods and returns a promise
		// which is resolved once all
		waitForResolves(renderProps, store)
			.then(() => {
				// TODO: render html
			});
	}
});
```

## API

### resolve(resolver)
```js
@resolve(({ dispatch }) => dispatch(..))
class MyComponent extends Component { };
```

`resolver` receives an object with the following keys as argument:

- `dispatch`: the store's dispatch function
- `getState`: the store's getState function
- `history`: the history object from your router
- `params`: the params object from the route
- `query`: the query object from the route

Please note `resolve()` returns a new component wrapped with the target component, similar to `connect()`. To use `resolve()` in ES5, try the following:

```js
MyComponent = resolve(function(obj) {
	return obj.dispatch(..);
})(MyComponent);
```
