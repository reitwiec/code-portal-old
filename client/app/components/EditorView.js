import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { Button, Content, Editor, Sidebar } from 'components';

const hello = () => console.log('You just submitted');

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
			<NavLink to="/submission">
			<Button onClick={hello}>Submit</Button>
				</NavLink>
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
		color: #465b97;
		font-weight: 400;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	${Content} > div {
		margin-bottom: 2em;
	}

`;
