import React, { Component } from 'react';
import styled from 'styled-components';
import { Content, Button, Gauge, Navbar } from 'components';
import { NavLink, Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

const ans = {
	AC: 'fa fa-check-circle',
	WA: 'fa fa-times-circle',
	TLE: 'fa fa-clock',
	CE: 'fa fa-times-circle',
	RE: 'fas fa-exclamation-triangle',
	PROC: 'fas fa-spinner fa-pulse'
};

function pad(num, size) {
	var s = num+"";
	while (s.length < size) s = "0" + s;
	return s;
}

@inject('questionsStore', 'contestsStore')
@observer
class Submission extends Component {
	constructor(props) {
		super(props);
		this.state = {
			val_1: 0,
			val_2: 0
		};
	}

	componentDidMount() {
		if(this.props.submissionId !== 'processing')
			this.props.questionsStore.setSubmission(this.props.submissionId);

		// var x = 1;
		// var elem = document.getElementById('accuracy');
		// var id = setInterval(frame, 30);
		// function frame() {
		// 	if (x >= 73) {
		// 		clearInterval(id);
		// 	} else {
		// 		x = x + 2;
		// 		elem.innerText = x;
		// 	}
		// 	elem.innerText = x + '%';
		// }
		// this.interval = setInterval(
		// 	() =>
		// 		this.state.val_1 >= 73
		// 			? clearInterval(this.interval)
		// 			: this.setState({ val_1: this.state.val_1 + 1 }),
		// 	10
		// );
		// this.interval = setInterval(
		// 	() =>
		// 		this.state.val_2 >= 9.35
		// 			? clearInterval(this.interval)
		// 			: this.setState({ val_2: this.state.val_2 + 0.3 }),
		// 	10
		// );
	}


	render() {
		const {
			questionsStore: {
				points,
				verdict,
				cases,
				score,
				slug,
				title,
				submission
			}
		} = this.props;

		const contestSlug = this.props.contestsStore.slug;
		const contestTitle = this.props.contestsStore.title;

		if(submission && this.props.submissionId === 'processing')
			return <Redirect to={`/submission/${submission}`} />

		return (
			<div className={this.props.className}>
				<Navbar />
				<Content>
					<div>
						<NavLink to="/contests">
							<span className="navigation">All Contests</span>
						</NavLink>
						<span className="navigation1">&nbsp;&nbsp;>&nbsp;&nbsp;</span>
						<NavLink to={`/contest/${contestSlug}`}>
							<span className="navigation">{contestTitle}</span>
						</NavLink>
						<span className="navigation1">&nbsp;&nbsp;>&nbsp;&nbsp;</span>
						<NavLink to={`/question/${slug}`}>
							<span className="navigation">{title}</span>
						</NavLink>
						<span className="navigation1">&nbsp;&nbsp;>&nbsp;&nbsp;</span>
						<NavLink to="/submission">
							<span className="navigation">Result</span>
						</NavLink>
					</div>
					<h1 className="test">Test Cases Result</h1>
					<div className="flex-container">
						{cases.map((c, i) =>
							<div className="fa-3x result" key={`result_${i}`}>
								{pad(i + 1, (cases.length + '').length)}
								<i className={ans[c.verdict]} aria-hidden="true" />
							</div>
						)}
					</div>
					<hr />

					<div className="container1">
						<div className="column">
							<h3>Your Score</h3>
							<section id="score">{points}/{score}</section>
							<Gauge
								color="#ea2d78"
								size="3em"
								percentage={points / score}
							/>
						</div>
{/*
						<div className="column">
							<h3>Your Accuracy</h3>
							<section id="accuracy" />
							<Gauge
								color="#0f0"
								size="3em"
								percentage={this.state.val_1 / 100.0}
							/>
						</div> */}
					</div>

					<div className="run">
						<h3>Verdict</h3>
						<section>{verdict}</section>
					</div>

					<NavLink to={`/question/${slug}`}>
						<Button>Back</Button>
					</NavLink>

					<div className="beauty">
						<h1>Result</h1>
					</div>
				</Content>
			</div>
		);
	}
}

export default styled(Submission)`
	.flex-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		width: 70%;
	}

	.result {
		margin: 10px;
		width: calc(100% / 5);
		font-size: 1rem;
		color: #fff;
	}

	hr {
		opacity: 0.5;
		width: 60%;
	}
	h1 {
		color: #fff;
		font-size: 2.3em;
		font-weight: 700;
	}

	.container {
		margin-top: 30px;
		padding: 10px;
		display: flex;
		width: 800px;
		justify-content: space-between;
	}
	.run {
		margin-top: 50px;
	}
	.container1 {
		margin-top: 30px;
		display: flex;
		width: 400px;
		justify-content: space-between;
		height: 150px;
	}
	.column {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.column > span {
		padding-bottom: 8px;
		font-size: 1.1em;
		display: flex;
		flex-direction: row;
		color: #c8c8d1;
	}

	h3 {
		color: #fff;
		margin-top: 25px;
		font-size: 1.5em;
	}

	section {
		font-size: 1.2em;
		color: #c8c8d1;
	}
	margin-bottom: 50px;
	${Button} {
		margin-top: 40px;
	}

	.navigation,
	.navigation1 {
		font-weight: 600;
		font-size: 13px;
		color: #6a93ff;
		transition: 0.5s;
	}
	.navigation1 {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	a {
		text-decoration: none;
	}
	.navigation:hover {
		color: #fff;
	}

	.beauty {
		color: white;
		bottom: 35px;
		right: 0px;
		font-size: 100px;
		position: absolute;
		opacity: 0.02;
	}

	.test {
		margin-top: 20px;
	}
	.fa, .fas {
		color: #fff;
		margin-top: 3px;
		margin-left: 10px;

		&.fa-check-circle {
			color: #00e048;
		}

		&.fa-exclamation-triangle,
		&.fa-times-circle,
		&.fa-clock {
			color: #ff0100;
		}

	}

	.column > span {
		margin: 2px 0 2px 0;
	}

`;
