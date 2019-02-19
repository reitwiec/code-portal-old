import React, { Component } from 'react';
import styled from 'styled-components';

class TextField extends Component {
	state = {
		value: ''
	};

	onChange = e => {
		this.setState({ value: e.target.value });
		this.props.onChange(e.target.value);
	};

	render() {
		const { className, label } = this.props;
		return (
			<label className={className}>
				{label}
				<input
					type="text"
					name="title"
					value={this.state.value}
					onChange={this.onChange}
				/>
			</label>
		);
	}
}

export default styled(TextField)`
	input {
		font-weight: 400;
		outline: none;
		box-shadow: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		-o-appearance: none;
		-ms-appearance: none;
		appearance: none;
		text-indent: 10px;
		width: 250px;
		border: 1px solid #1e202f;
		border-radius: 25px;
		height: 25px;
		background: #232437;
		color: #fff;

		::-webkit-input-placeholder {
			color: #62638a;
			opacity: 1;
			font-size: 0.9em;
		}
	}
`;
