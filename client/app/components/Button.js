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
`;
