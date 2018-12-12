import React from 'react';
import styled from 'styled-components';

const Button = ({ className, onClick, children }) => (
	<button className={className} onClick={onClick}>
		{children}
	</button>
);

export default styled(Button)`
	border: 2px solid #797df8;
	color: #797df8;
	text-align: center;
	text-decoration: none;
	font-size: 16px;
		font-family: 'Source Sans Pro', sans-serif;
		font-size: 0.7em;
		font-weight: 600;
		background-color: #fff;
		width: 70px;
		height: 28px;
		border-radius: 25px;
		border: 1px solid #797df8;
		transition: 0.5s;
		margin-top: -0.5em;
		float: left;
	:hover{
		color:#fff;
		background-color: #797df8;
			border: none;
			cursor: pointer;
	}
`;
