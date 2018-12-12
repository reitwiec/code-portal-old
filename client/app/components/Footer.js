import React, { Component } from 'react';
import styled from 'styled-components';

class Footer extends Component {
	render() {
		return (
			<footer className={this.props.className}>
				<span>❤️ IECSE Manipal ©</span>
			</footer>
		);
	}
}

export default styled(Footer)`
	text-align: center;
	span {
		font-size: 0.8em;
		line-height: 40px;
		color: #373d5d;
	}
`;
