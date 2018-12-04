import React, { Component } from 'react';
import styled from 'styled-components';

import {
	Homeicon,
	Contesticon,
	Practiceicon,
	Notif,
	Searchbar
} from 'components';

import { iecselogo, avatar } from 'assets';

var x = 'Reitwiec S';

class Navbar extends Component {
	render() {
		return (
			<div className={this.props.className}>
				<span id="logo">
					<img src={iecselogo} alt="" id="logoimg" />
				</span>
				<span id="avatar">
					<img src={avatar} alt="" id="avatarimg" />
				</span>
				<span id="unamenav">{x}</span>
				<Notif />
				<Homeicon title="hello" />
				<Contesticon />
				<Practiceicon />
				<Searchbar />
			</div>
		);
	}
}

export default styled(Navbar)`
	z-index: 1;
	top: 0px;
	position: fixed;
	background-color: #edf0f9;
	width: 100%;
	height: 50px;

	#logo {
		position: absolute;
		top: -4px;
		left: 25px;
		transition: 1.2s;

		img {
			width: 80px;
			height: 60px;
			transition: 1.2s;
		}

		:hover {
			cursor: pointer;
		}
	}

	#avatar {
		position: absolute;
		top: 10px;
		right: 25px;
		transition: 0.5s;

		:hover {
			top: 12px;
			right: 27.5px;
		}

		img {
			border-radius: 50%;
			width: 30px;
			height: 30px;
			transition: 0.5s;

			:hover {
				opacity: 0.7;
				width: 28px;
				height: 28px;
				cursor: pointer;
			}
		}
	}

	#notif {
		position: absolute;
		top: 9px;
		right: 22px;
		float: right;
		height: 10px;
		width: 10px;
		stroke: #edf0f9;
		stroke-width: 100px;
		transition: 0.5s;
	}

	#avatar:hover ~ #notif {
		top: 12px;
		right: 24px;
		height: 8px;
		width: 8px;
	}

	#unamenav {
		font-family: 'Source Sans Pro', sans-serif;
		font-size: 0.7em;
		color: #373d5d;
		font-weight: 600;
		position: absolute;
		top: 18px;
		right: 65px;
		transition: 0.5s;
	}

	#avatar:hover ~ #unamenav {
		color: #797df8;
		right: 62px;
	}
`;
