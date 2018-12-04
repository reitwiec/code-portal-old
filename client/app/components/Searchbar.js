import React, { Component } from 'react';
import styled from 'styled-components';

class Searchbar extends Component {
	render() {
		return (
			<form action="" className={this.props.className}>
				<input
					type="text"
					placeholder="Search for contests, questions & more..."
				/>
				<button type="submit" className="searchButton">
					<i className="fa fa-search">
						<span id="searchbtntext">Search</span>
					</i>
				</button>
			</form>
		);
	}
}

export default styled(Searchbar)`
	position: absolute;
	top: 11px;
	left: 250px;
	width: 200px;

	input,
	button:focus {
		outline: none;
	}

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
		border: 1px solid #d6deea;
		border-radius: 25px;
		height: 25px;

		::-webkit-input-placeholder {
			color: #373d5d;
			opacity: 0.5;
			font-size: 0.9em;
		}
	}

	button {
		background-color: #edf0f9;
		width: 70px;
		height: 28px;
		border-radius: 25px;
		position: absolute;
		border: 1px solid #797df8;
		top: 0px;
		left: 260px;
		transition: 0.8s;

		:hover {
			background-color: #797df8;
			border: none;
			cursor: pointer;

			.fa {
				color: #fff;
			}
		}

		.fa {
			color: #797df8;
			transition: 0.8s;
		}

		i > span {
			font-family: 'Source Sans Pro', sans-serif;
			font-size: 0.9em;
			font-weight: 600;
			padding: 0 0 0 5px;
		}
	}
`;
