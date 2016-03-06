import { Component } from 'react';
import resolve from './../../resolve.js';
import fetch from 'node-fetch';

export function fetchSandwich() {
	return (dispatch) => {
		dispatch({
			type: 'FETCH_SANDWICH_STARTED'
		});

		fetch('http://example.com/api/sandwich')
			.then((response) => response.json())
			.then((sandwich) => {
				dispatch({
					type: 'FETCH_SANDWICH_SUCCEEDED',
					sandwich: sandwich
				});
			});
	}
};

@resolve(({ dispatch }) => dispatch(fetchSandwich()))
export class Sandwich extends Component {
	render() {
		const { sandwich } = this.props;

		return (
			<div>
				<h1>{sandwich.name}</h1>
			</div>
		);
	}
}
