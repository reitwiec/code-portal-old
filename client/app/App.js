import React, { Component } from 'react';
import styled from 'styled-components';

import { Navbar, Sidebar, Content, GlobalStyle } from 'components';

class App extends Component {
	render() {
		return (
			<>
				<GlobalStyle />
				<div className={this.props.className}>
					<Navbar />
					<Sidebar />
					<Content />
				</div>
			</>
		);
	}
}

export default styled(App)`
	text-align: center;
`;
