import React, { Component, Suspense, lazy } from 'react';
import styled, { keyframes } from 'styled-components';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import {
	Content,
	ContestsPage,
	ContestView,
	EditorView,
	GlobalStyle,
	Navbar,
	Sidebar,
	Footer,
	Submission,
	Questions,
	Error,
	Login,
	Register,
	Leaderboard,
	Profile
} from 'components';

// const AdminView = lazy(() => import('./components/admin/AdminView'));
import AdminView from './components/admin/AdminView';

import { observer, inject } from 'mobx-react';

const question = {
	title: '',
	body: ``,
	constraints: '',
	input_format: '',
	output_format: '',
	submissions: 1289
};

@inject('userStore')
@observer
class App extends Component {
	componentDidMount() {
		this.props.userStore.fetchUser();
	}

	loginRequired = Component =>
		this.props.userStore.user ? Component : <Redirect to="/contests" />;

	redirectLoggedin = Component =>
		this.props.userStore.user ? <Redirect to="/contests" /> : Component;

	render() {
		const {
			userStore: { user, loading }
		} = this.props;

		return (
			<>
				{loading ? (
					<div />
				) : (
					<BrowserRouter>
						<div className={this.props.className}>
							<Suspense fallback={<h2>Loading</h2>}>
								<Switch>
									<Route
										path="/contests"
										component={() => this.loginRequired(<ContestsPage />)}
										exact
									/>
									<Route
										path="/question/:slug"
										component={({ match }) =>
											this.loginRequired(
												<EditorView
													question={question}
													slug={match.params.slug}
												/>
											)
										}
									/>
									/>
									<Route
										path="/leaderboard/:slug"
										component={({ match }) =>
											this.loginRequired(
												<Leaderboard
													slug={match.params.slug}
												/>
											)
										}
									/>
									<Route
										path="/profile/:slug"
										component={({ match }) =>
											this.loginRequired(
												<Profile
													username={match.params.slug}
												/>
											)
										}
									/>
									<Route
										path="/__admin"
										component={() => this.loginRequired(<AdminView />)}
									/>
									<Route
										path="/submission/:id"
										render={({ match }) =>
											this.loginRequired(<Submission submissionId={match.params.id} />)
										}
									/>
									<Route
										path="/contest/:slug"
										render={({ match }) =>
											this.loginRequired(<Questions slug={match.params.slug} />)
										}
									/>
									<Route
										path="/login"
										component={() => this.redirectLoggedin(<Login />)}
									/>
									<Route
										path="/register"
										component={() => this.redirectLoggedin(<Register />)}
									/>
									<Route
										path="/"
										component={() => this.redirectLoggedin(<Login />)}
										exact
									/>
									<Route component={() => <Error />} />
								</Switch>
							</Suspense>
							<Footer />
						</div>
					</BrowserRouter>
				)}
				<GlobalStyle />
			</>
		);
	}
}

var footerup = keyframes`
	0% {
		transform: rotate(0) translateY(10px);
		opacity: 0;
	}
100% {
    transform: rotate(0) translateY(0);
    opacity: 1;
    }
`;

export default styled(App)`
	hr {
		margin-top: 30px;
		border: 0.5px solid #dfe5f4;
	}
	${Footer} {
		animation: ${footerup} 1s 1 0s ease-in;
	}
`;
