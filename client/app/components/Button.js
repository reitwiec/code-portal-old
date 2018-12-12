import React from 'react';
import styled from 'styled-components';

const Button = ({ className, onClick, children }) => (
	<button className={className} onClick={onClick}>
		{children}
	</button>
);

export default styled(Button)`
	background-color: transparent;
	border: none;
	border: 2px solid #797df8;
	color: #797df8;
	padding: 0.5em;
	text-align: center;
	text-decoration: none;
	font-size: 16px;
`;
