import assert from 'assert';
import waitForResolves from '../waitForResolves.js';

const emptyRenderProps = { location: { params: {}, query: {} }, components: [], history: {}};
const emptyStore = { dispatch: () => {}, getState: () => {} };

describe('waitForResolves', () => {
	it('null arguments', () => {
		assert.throws(() => waitForResolves(null, null), Error);
	});

	it('invalid store, valid renderProps', () => {
		assert.throws(() => waitForResolves(emptyRenderProps, null), Error);
	});

	it('valid params, returns promise', () => {
		var ret = waitForResolves(emptyRenderProps, emptyStore);
		assert.equal(typeof ret.then, 'function');
	});

	it('renderProps with 1 resolve', () => {
		let called = false;
		const renderProps = {
			...emptyRenderProps,
			components: [{
				resolves: [({ dispatch, getState, history, params, query }) => {
					assert.equal(typeof dispatch, 'function');
					assert.equal(typeof getState, 'function');
					assert.equal(typeof history, 'object');
					assert.equal(typeof params, 'object');
					assert.equal(typeof query, 'object');

					called = true;
				}]
			}]
		};

		return waitForResolves(renderProps, emptyStore)
			.then(() => {
				assert.equal(called, true);
			});
	});

	it('renderProps with undefined component', () => {
		let called = false;
		const renderProps = {
			...emptyRenderProps,
			components: [
				undefined,
				{
					resolves: [({ dispatch, getState, history, params, query }) => {
						assert.equal(typeof dispatch, 'function');
						assert.equal(typeof getState, 'function');
						assert.equal(typeof history, 'object');
						assert.equal(typeof params, 'object');
						assert.equal(typeof query, 'object');

						called = true;
					}]
				}
			]
		};

		return waitForResolves(renderProps, emptyStore)
			.then(() => {
				assert.equal(called, true);
			});
	});
});
