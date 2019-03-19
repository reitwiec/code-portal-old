import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { iecselogo } from 'assets';
import { Registerbox } from 'components';
import store from 'store';
import { Link } from 'react-router-dom';

class Register extends Component {
	render() {
		return (
			<div className={this.props.className}>
				<span id="logo">
					<img src={iecselogo} alt="" id="logoimg" />
				</span>
				<Registerbox />
				<div className="alternative">
					<Link className="link" to={'/login'}>
						Login
					</Link>
					{/* <Link className="link" to={'/forgotpassword'}>
						Recover Account
					</Link> */}
				</div>
			</div>
		);
	}
}

const slide = keyframes`
	0% {
		transform: rotate(0) translateX(30px);
		opacity: 0;
	}

	100% {
		transform: rotate(0) translateX(0);
	}
`;

const slide1 = keyframes`
	0% {
		transform: rotate(0) translateX(-300px);
		opacity: 0;
	}

	100% {
		transform: rotate(0) translateX(0);
	}
`;

export default styled(Register)`
	height: auto;
	#logo {
		position: absolute;
		top: -4px;
		left: 25px;
		transition: 1.2s;
		animation: ${slide} 1s 1 0s ease-in;

		img {
			width: 120px;
			height: 90px;
			transition: 1.2s;
		}

		:hover {
			cursor: pointer;
		}
	}

	.alternative {
		text-align: center;
		margin-bottom: 30px;
	}

	.alternative > .link {
		margin: 20px;
		font-size: 0.9em;
		color: #9e9ebb;
		transition: 0.3s;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		animation: ${slide1} 1s 1 0s ease-in;
		text-decoration: none;
		:hover {
			color: #fff;
			cursor: pointer;
			font-size: 1em;
		}
	}
`;
