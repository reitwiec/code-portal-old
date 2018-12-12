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
		margin: 1em 0;
	}

	h2 {
		margin-top: 0;
	}

	${Content} > div {
		margin-bottom: 2em;
	}

	${Button} {
		font-variant: small-caps;
		margin-top: 0.5em;
		float: right;
	}
`;
