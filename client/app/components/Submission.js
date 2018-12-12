import React, { Component } from 'react';
import styled from 'styled-components';
import { Sidebar, Content, Correct, Wrong, Button, Gauge } from 'components';
import { NavLink } from 'react-router-dom';

class Submission extends Component {
	render() {
		return (
			<div className={this.props.className}>
				<Sidebar />
				<Content>
					<h1>Test Cases Result</h1>
					<div className="container">
						<div className="column">
							<span>
								01
								<Correct />
							</span>
							<span>
								02
								<Correct />
							</span>
							<span>
								03
								<Correct />
							</span>
							<span>
								04
								<Correct />
							</span>
							<span>
								05
								<Wrong />
							</span>
						</div>
						<div className="column">
							<span>
								06
								<Correct />
							</span>
							<span>
								07
								<Wrong />
							</span>
							<span>
								08
								<Correct />
							</span>
							<span>
								09
								<Wrong />
							</span>
							<span>
								10
								<Correct />
							</span>
						</div>
						<div className="column">
							<span>
								11
								<Correct />
							</span>
							<span>
								12
								<Wrong />
							</span>
							<span>
								13
								<Correct />
							</span>
							<span>
								14
								<Wrong />
							</span>
							<span>
								15
								<Correct />
							</span>
						</div>
						<div className="column">
							<span>
								16
								<Wrong />
							</span>
							<span>
								17
								<Correct />
							</span>
							<span>
								18
								<Correct />
							</span>
							<span>
								19
								<Correct />
							</span>
							<span>
								20
								<Correct />
							</span>
						</div>
						<div className="column">
							<span>
								21
								<Correct />
							</span>
							<span>
								22
								<Correct />
							</span>
							<span>
								23
								<Correct />
							</span>
							<span>
								24
								<Correct />
							</span>
							<span>
								25
								<Correct />
							</span>
						</div>
						<div className="column">
							<span>
								26
								<Correct />
							</span>
							<span>
								27
								<Wrong />
							</span>
							<span>
								28
								<Correct />
							</span>
							<span>
								29
								<Correct />
							</span>
							<span>
								30
								<Wrong />
							</span>
						</div>
					</div>

					<h3>Your Score</h3>
					<section>
						<Gauge color="#0ce" size="3em" percentage={9.35 / 15.0} />
						9.35/15.00
					</section>
					<h3>Run Time</h3>
					<section>2.3ms</section>
					<h3>Your Accuracy</h3>
					<section id="percentage">
						<Gauge color="#0f0" size="3em" percentage={73 / 100} />
						73%
					</section>

					<NavLink to="/editor">
						<Button>Back</Button>
					</NavLink>
				</Content>
			</div>
		);
	}
}

export default styled(Submission)`
	max-width: 150ch;
	h1 {
		color: #374262;
		font-size: 2.3em;
		font-weight: 700;
	}

	.container {
		margin-top: 30px;
		display: flex;
		width: 800px;
		justify-content: space-between;
	}
	.column {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	span {
		padding-bottom: 8px;
		font-size: 1.1em;
		display: flex;
		flex-direction: row;
		color: #465b97;
	}
	${Correct} #correct {
		margin-left: 0.8em;
		padding-top: 2px;
		height: 20px;
		width: 20px;
	}

	h3 {
		color: #374262;
		margin-top: 25px;
		font-size: 1.5em;
	}

	section {
		font-size: 1.2em;
		color: #465b97;
	}

	margin-bottom: 100px;
	${Button} {
		margin-top: 20px;
	}
`;
