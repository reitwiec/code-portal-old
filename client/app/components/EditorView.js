import React from 'react';
import styled from 'styled-components';

import { Button, Content, Editor, Sidebar } from 'components';

const hello = () => console.log('Hello');

const EditorView = ({ className, question }) => (
	<div className={className}>
		<Sidebar />
		<Content>
			<div>
				<h2>{question.title}</h2>
				<section>{question.body}</section>

				<h3>Input Format</h3>
				<section>{question.input_format}</section>

				<h3>Constraints</h3>
				<section>{question.constraints}</section>

				<h3>Output Format</h3>
				<section>{question.output_format}</section>
			</div>
			<Editor />
			<Button onClick={hello}>Submit</Button>
		</Content>
	</div>
);

export default styled(EditorView)`
	max-width: 150ch;
	h2,
	h3 {
		color: #374262;
		font-weight: 700;
		margin: 1em 0;
	}

	h2 {
		font-size:2em;
		margin-top: 0;
		margin-bottom: 0.5em;
	}
	section{
		color: #374262;
		font-weight: 400;
	}

	${Content} > div {
		margin-bottom: 2em;
	}

	${Button} {
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
	}
	${Button}:hover{
		color:#fff;
		background-color: #797df8;
			border: none;
			cursor: pointer;
	}
`;
