import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import {
	Homeicon,
	Contesticon,
	Practiceicon,
	Notif,
	Searchbar
} from 'components';

import { iecselogo, avatar } from 'assets';

@inject('userStore')
@observer
class Navbar extends Component {
	render() {
		const {
			userStore: {
				user: { name, username }
			}
		} = this.props;
		return (
			<div className={`${this.props.className}`}>
				<div className=" navbar-flex">
					<NavLink to="/" className="left-align-flex">
						<span id="logo">
							<img src={iecselogo} alt="" id="logoimg" />
						</span>
						{/* <Homeicon title="hello" /> */}
					</NavLink>

					<NavLink to="/contests" className={`nav-item`}>
						<Contesticon />
					</NavLink>

					<NavLink to={`/profile/${username}`} className={`nav-item`}>
						<span id="avatar">
							<img src={avatar} alt="" id="avatarimg" />
						</span>
						<span id="unamenav">{name}</span>
						<Notif />
					</NavLink>
				</div>

{/*
				<NavLink to="/practice">
					<Practiceicon />
				</NavLink> */}

				{/* <Searchbar /> */}
			</div>
		);
	}
}

export default styled(Navbar)`
	z-index: 1;
	position: sticky;
	top: 0;
	background: #2f2f4b; /* Old browsers */
	// background: -moz-radial-gradient(center, ellipse cover, #2f2f4b 9%, #282840 100%); /* FF3.6-15 */
	// background: -webkit-radial-gradient(center, ellipse cover, #2f2f4b 9%,#282840 100%); /* Chrome10-25,Safari5.1-6 */
	// background: radial-gradient(ellipse at center, #2f2f4b 9%,#282840 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	// filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2f2f4b', endColorstr='#282840',GradientType=1 );
	width: 100%;
	height: 50px;

	.left-align-flex {
		margin-right: auto;
	}

	.navbar-flex {
		display: flex;
		justify-content: flex-end;
		width: 100%:
		align-items: center;
		height: 100%;
	}

	.nav-item {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 10px;
	}

	#logo {
		transition: 1.2s;

		img {
			width: 80px;
			height: 60px;
			transition: 1.2s;
			transform: translate(10px, -5px);
		}

		:hover {
			cursor: pointer;
		}
	}

	#avatar {
		display: none;
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
			border: 1px solid #78a5fe;
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
		display: none;
		position: absolute;
		top: 9px;
		right: 22px;
		float: right;
		height: 10px;
		width: 10px;
		stroke: #2f2e4b;
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
		color: #78a5fe;
		font-weight: 600;
		transition: 0.5s;
	}

	#avatar:hover ~ #unamenav {
		right: 62px;
	}
`;
