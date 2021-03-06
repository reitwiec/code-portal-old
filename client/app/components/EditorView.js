import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import Markdown from 'react-remarkable';
import { NavLink } from 'react-router-dom';
import { Button, Content, Editor, Navbar } from 'components';
import { observer, inject } from 'mobx-react';

function MarkdownWrapper(source) {
	return <Markdown
	source={source}
	options={{
		html: true,
		linkify: true,
		langPrefix: 'code-block language-',
		highlight: function(str, lang) {
			if (lang && hljs.getLanguage(lang)) {
				try {
					return hljs.highlight(lang, str).value;
				} catch (err) {
					console.log(err);
				}
			}
			try {
				return hljs.highlightAuto(str).value;
			} catch (err) {
				console.log(err);
			}
			return '';
		}
	}}
/>
}

@inject('questionsStore', 'contestsStore')
@observer
class EditorView extends Component {
	componentDidMount() {
		this.props.questionsStore.setSubmission(null);

		var levels = {
			EASY: 10,
			MEDIUM: 50,
			HARD: 90
		};

		var speed = {
			EASY: 0.2,
			MEDIUM: 0.5,
			HARD: 0.8
		};
		var elem = document.getElementById('myBar');
		// var width = 1;
		// var id = setInterval(frame.bind(this), 10);
		this.props.questionsStore.resetQuestion();
		this.props.questionsStore.fetchQuestion(this.props.slug, () => {
			elem.style.width = levels[this.props.questionsStore.level] + '%';
		});

		// function frame() {
		// 	if (width >= levels[this.props.questionsStore.level]) {
		// 		clearInterval(id);
		// 	} else {
		// 		width = width + speed[this.props.questionsStore.level];
		// 		elem.style.width = width + '%';
		// 	}
		// }
	}

	render() {
		const {
			questionsStore: {
				body,
				constraints,
				id,
				input_format,
				level,
				output_format,
				score,
				slug,
				title,
				samples,
				submitAnswer
			}
		} = this.props;

		const contestSlug = this.props.contestsStore.slug;
		const contestTitle = this.props.contestsStore.title;

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
					</div>

					<div>
						<div className="box">
							<h2>{title}</h2>
							<span className="fadebg1">{score}</span>
						</div>
						<div id="myProgress">
							<div id="myBar" />
						</div>
						<div className="question-details">
							<span className="difficulty">
								<strong>Difficulty: </strong>{' '}
								<span className="level">{level.toLowerCase()}</span>
							</span>
							<NavLink to={`/submissions/${slug}`} className="view-submissions">
								<strong>View Submissions</strong>{' '}
							</NavLink>
						</div>
						<section className="question-body">
							{MarkdownWrapper(body)}
						</section>
						<hr />

						<div className="box1">
							<h3>Input Format</h3>
							{/* <svg viewBox="0 0 1500 1500" className="input" fill="white">
								<path d="M62.43,824.15c6.85-15.72,19.37-20.55,35.78-20.39,47.26.46,94.53,0,141.79.22,27,.11,34.89,8.2,34.91,35.09q.07,131.76,0,263.54V1120h951v-18.12q0-130.22,0-260.45c0-30.31,7-37.43,37.15-37.49q69.36-.13,138.71,0c28.13.1,35.59,7.73,35.6,35.8,0,152.57-.17,305.15.26,457.72,0,16-4.25,27.94-18.78,35.34H62.43Z" />
								<path d="M592.12,592.7V572.6q0-170.23,0-340.48c0-42.5,19.51-62,62.08-62.07q97-.12,194.11,0c40.12.08,60.73,20.61,60.77,60.72q.17,171,0,342v19.9h18.14c64.19,0,128.39-.23,192.58.19,30.46.21,50.81,20,53.69,50.3,1.67,17.54-6.75,30.34-18.49,42q-65.52,65.21-130.77,130.68-116,116-232.07,232c-27.93,27.92-55.44,28-83,.48Q528.37,867.56,347.36,686.9c-17.89-17.8-25.66-36.66-16.05-60.85,9.19-23.13,25.75-33.25,55-33.31q93.21-.16,186.41,0Z" />
							</svg> */}
						</div>

						<section>{MarkdownWrapper(input_format)}</section>
						<div className="box1">
							<h3>Constraints</h3>
						</div>

						<section>{MarkdownWrapper(constraints)}</section>

						<div className="box1">
							<h3>Output Format</h3>
						</div>

						<section>{MarkdownWrapper(output_format)}</section>

						{
							samples.map((sample, i) => (
								<div>
									<div className="box1">
										<h3>Sample Input {i + 1}</h3>
									</div>

									<section className="copyable">{MarkdownWrapper(sample.input)}</section>

									<div className="box1">
										<h3>Sample Output {i + 1}</h3>
									</div>

									<section className="copyable">{MarkdownWrapper(sample.output)}</section>
								</div>
							))
						}

					</div>
					<Editor />
					<div className="java-note">Java class names must be: Main</div>
					<NavLink to="/submission/processing">
						<Button onClick={submitAnswer}>Submit</Button>
					</NavLink>
					<div className="beauty">
						<h1>Edit</h1>
					</div>
				</Content>
			</div>
		);
	}
}

var Gradient = keyframes`
0% {
    background-position: 0% 50%
}
50% {
    background-position: 100% 50%
}
100% {
    background-position: 0% 50%
}
`;

export default styled(EditorView)`
	${Content} {
		margin-right: 70px;
	}
	.fadebg1 {
		padding-left: 10px;
		opacity: 0.23;
		color: white;
		font-weight: 900;
		z-index: -1;
		font-size: 70px;
		bottom: -1px;
		left: -10px;
		position: absolute;
	}

	h2,
	h3 {
		padding-left: 5px;
		padding-bottom: 5px;
		padding-top: 5px;
		color: #fff;
		font-weight: 700;
		margin: 1em 0;
	}

	h2 {
		padding-top: 15px;
		font-size: 2em;
		margin-top: 0;
		margin-bottom: 0.5em;
	}
	section {
		white-space: pre-line;
		padding-left: 10px;
		margin-bottom: 10px;
		line-height: 2;
		color: #c8c8d1;
		font-weight: 400;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.copyable {
		user-select: auto;
	}

	${Content} > div {
		margin-bottom: 2em;
	}

	.box1 {
		display: flex;
		width: 13%;
		align-items: center;
		justify-content: space-between;
	}

	.input {
		width: 20px;
		height: 20px;
	}

	.box {
		overflow: hidden;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		filter: drop-shadow(7px 5px 10px #1b1b2b);
		margin-bottom: 1.5em;
		justify-content: space-between;
		display: flex;
		line-height: 30px;
		flex-direction: row;
		border-radius: 8px;
		border-radius: 4px;
		background: linear-gradient(45deg, #a94cf2, #6f67fc);
		background-size: 400% 400%;
		animation: ${Gradient} 3s ease infinite;
	}

	.difficulty {
		color: white;
		padding-top: 15px;
		padding-right: 10px;
		margin-bottom: 200px;
	}

	.level {
		text-transform: capitalize;
	}

	hr {
		opacity: 0.5;
	}
	#myProgress {
		border-radius: 3px;
		height: 5px;
		width: 10%;
		background-color: #2e2e4a;
		margin: 10px 0;
	}

	#myBar {
		transition: width 1.5s ease;
		border-radius: 3px 0 0 3px;
		width: 0%;
		height: 5px;
		background-color: #6b9cfd;
	}

	.beauty {
		color: white;
		bottom: 195px;
		right: 0px;
		font-size: 100px;
		position: absolute;
		opacity: 0.02;
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

	.question-body {
		margin-top: 30px;
	}

	.question-details {
		display: flex;
		max-height: 35px;
	}

	.view-submissions {
		margin-left: auto;
		color: #699AFB;
		cursor: pointer;
	}

	.java-note {
		color: white;
		display: flex;
		justify-content: flex-end;
	}
`;
