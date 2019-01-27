import React, { Component } from 'react';

export default class TextArea extends Component {
	state = {
		value: ''
	};

	onChange = e => {
		this.setState({ value: e.target.value });
		this.props.onChange(e.target.value);
	};

	render() {
		const { label } = this.props;
		return (
			<label>
				{label}
				<textarea
					type="text"
					value={this.state.value}
					onChange={this.onChange}
				/>
			</label>
		);
	}
}
