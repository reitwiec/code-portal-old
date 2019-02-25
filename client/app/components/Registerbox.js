import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { observer, inject } from 'mobx-react';
import { Redirect } from 'react-router-dom';

import { Button } from 'components';
import { FormInput } from 'components';

@inject('registerStore', 'authStore', 'userStore')
@observer
class Registerbox extends Component {
	submit = event => {
		event.preventDefault();
		this.props.registerStore.onSubmit();
	};

	render() {
		const {
			className,
			registerStore: { fields, meta, onFieldChange, onSubmit },
			authStore: isLoggedIn,
			userStore: user
		} = this.props;

		if (!isLoggedIn || !user || true) {
			return (
				<div className={className}>
					<div className="container">
						<h2>
							Register for <span>CodePortal</span>{' '}
						</h2>
						<form onSubmit={this.submit}>
							<FormInput
								type="text"
								name="name"
								className="required"
								value={fields.name.value}
								error={fields.name.error}
								onChange={onFieldChange}
								placeholder="Name"
							/>
							<FormInput
								type="email"
								name="email"
								className="required"
								value={fields.email.value}
								error={fields.email.error}
								onChange={onFieldChange}
								placeholder="Email"
							/>
							<FormInput
								type="text"
								name="username"
								className="required"
								value={fields.username.value}
								error={fields.username.error}
								onChange={onFieldChange}
								placeholder="Username"
							/>
							<FormInput
								type="password"
								name="password"
								className="required"
								value={fields.password.value}
								error={fields.password.error}
								onChange={onFieldChange}
								placeholder="Password"
							/>
							<FormInput
								type="password"
								name="password_confirmation"
								className="required"
								value={fields.password_confirmation.value}
								error={fields.password_confirmation.error}
								onChange={onFieldChange}
								placeholder="Confirm Password"
							/>
							<FormInput
								type="text"
								name="organisation"
								className="required"
								value={fields.organisation.value}
								error={fields.organisation.error}
								onChange={onFieldChange}
								placeholder="Organisation"
							/>
							<FormInput
								type="text"
								name="regno"
								value={fields.regno.value}
								error={fields.regno.error}
								onChange={onFieldChange}
								placeholder="Registration number"
							/>
							<FormInput
								type="number"
								name="phone"
								value={fields.phone.value}
								error={fields.phone.error}
								onChange={onFieldChange}
								placeholder="Phone number"
							/>

							{meta.msg && (
								<div
									className={`meta ${
										meta.success ? 'meta-success' : 'meta-error'
									}`}>
									{' '}
									{meta.msg}{' '}
								</div>
							)}

							<button disabled={!meta.isValid} value="Continue" type="submit">
								Register
							</button>
						</form>
						<div className="beauty">
							<h1>User</h1>
						</div>
					</div>
				</div>
			);
		} else {
			if (user && (user.access === 20 || user.access === 30)) {
				return <Redirect to="/__admin" />;
			} else {
				return <Redirect to="/contests" />;
			}
		}
	}
}

const test = keyframes`
	0% { 
		opacity:0;
	}
	100% {
		opacity:1;
	}
`;

const test1 = keyframes`
	0% {
		width:40%;
	}
	100% {
		width:80%;
	}
`;

export default styled(Registerbox)`
	overflow: hidden;
	.container {
		animation: ${test} 0.8s 1 0s ease-in;
		overflow: hidden;
		position: relative;
		margin: 90px auto 30px;
		width: 400px;
		height: auto;
		padding-bottom: 30px;
		border-radius: 10px;

		text-align: center;
		background: #27273f; /* Old browsers */
		background: -moz-radial-gradient(
			center,
			ellipse cover,
			#27273f 9%,
			#1f1f33 100%
		); /* FF3.6-15 */
		background: -webkit-radial-gradient(
			center,
			ellipse cover,
			#27273f 9%,
			#1f1f33 100%
		); /* Chrome10-25,Safari5.1-6 */
		background: radial-gradient(
			ellipse at center,
			#27273f 9%,
			#1f1f33 100%
		); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#27273f', endColorstr='#1f1f33',GradientType=1 );
		filter: drop-shadow(0 0 0.95rem #1f2032);
	}

	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	h2 {
		margin-top: 20px;
		font-weight: 100;
		letter-spacing: 3px;
		color: #dfdfe7;
	}

	h2 > span {
		font-weight: 400;
		letter-spacing: normal;
	}

	.field-error-msg {
		position: absolute;
		left: 50%;
		bottom: -17px;
		font-size: 0.8em;
		width: 100%;
		transform: translateX(-50%);
		color: rgba(255, 0, 0, 0.7);
	}

	.field {
		display: block;
		animation: ${test1} 1.2s 1 0.2s ease-out forwards;

		color: #fff;
		border: 0px;
		box-shadow: none;
		outline: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		height: 35px;
		margin-top: 20px;
		margin-left: 38px;
		border: none;
		text-indent: 10px;
		background: rgba(255, 255, 255, 0);
		border-bottom: 1px solid rgba(223, 223, 231, 0.5);
	}

	.field:not(:first-child) {
		margin-top: 10px;
	}

	.required {
		color: red;
		position: relative;

		&::before {
			content: '*';
			color: rgba(0, 150, 200, 0.7);
			position: absolute;
			font-size: 1.8rem;
			top: 0px;
			right: 40px;
		}
	}

	input::-webkit-input-placeholder {
		color: rgba(223, 223, 231, 0.6);
	}

	button {
		color: #fff;
		font-weight: 400;
		float: none;
		background: #6f67fc;
		margin-top: 30px;
		width: 50%;
		height: 35px;
		padding: 10px;
		padding-top: 7px;
		border: none;
		border-radius: 5px;
		transition: 0.4s;
		:hover {
			width: 80%;
			background: #a94cf2;
			cursor: pointer;
		}
	}

	button > span {
		font-size: 1.2em;
	}

	.beauty {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		z-index: -1;
		color: white;
		bottom: -70px;
		left: -20px;
		font-size: 80px;
		position: absolute;
		opacity: 0.015;
	}

	.meta {
		margin-top: 20px;
	}

	.meta-success {
		color: green;
	}

	.meta-error {
		color: rgba(255, 0, 0, 0.7);
	}
`;
