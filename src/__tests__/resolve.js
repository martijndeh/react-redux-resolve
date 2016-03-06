import assert from 'assert';
import TestUtils from 'react-addons-test-utils';
import { Sandwich, fetchSandwich } from './components/sandwich.js';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

function setup() {
	let props = {};

	let renderer = TestUtils.createRenderer();
	renderer.render(<Sandwich />);
	let output = renderer.getRenderOutput();

	return {
		props,
		output,
		renderer
	};
}

describe('resolve', () => {
	afterEach(() => nock.cleanAll());

	it('initial test', (done) => {
		nock('http://example.com')
			.get('/api/sandwich')
			.reply(200, { id: 1, name: 'The Cheesesteak'});

		const expectedActions = [
			{ type: 'FETCH_SANDWICH_STARTED' },
			{ type: 'FETCH_SANDWICH_SUCCEEDED', sandwich: { id: 1, name: 'The Cheesesteak' } }
		];

		const store = mockStore({}, expectedActions, done);

		store.dispatch(fetchSandwich());
	});

	it('component did mount', () => {
		let called = false;
		const sandwich = new Sandwich();
		sandwich.context = {
			store: {
				getState: () => {},
				dispatch: () => {
					called = true;
				},
			},
		};
		sandwich.props = {
			history: {},
			location: {},
			params: {},
		};
		sandwich.componentDidMount();

		assert.equal(called, true);
	});
});
