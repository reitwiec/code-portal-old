import React, { Component } from 'react';
import styled from 'styled-components';
import { UnControlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/python/python';

const languages = {
	cpp: {
		name: 'C++',
		mode: 'text/x-c++src',
		boilerplate: `#include <iostream>
	
using namespace std;

int main() {
	cout << "Hello, world!" << endl;
	return 0;
}`
	},
	java: {
		name: 'Java',
		mode: 'text/x-java',
		boilerplate: `import java.util.Scanner;

public class Main {
	public static void main(String[] args) {
		System.out.println("Hello, world!");
	}
}`
	},
	python: {
		name: 'Python',
		mode: 'text/x-python',
		boilerplate: `def main():
	print("Hello, world!")

if __name__ == '__main__':
	main()`
	}
};

class Editor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			language: 'cpp'
		};
	}

	onLanguageChange = e => {
		this.setState({ language: e.target.value });
	};

	render() {
		return (
			<div className={this.props.className}>
				<div>
					<select value={this.state.value} onChange={this.onLanguageChange}>
						{Object.keys(languages).map((lang, i) => (
							<option key={i} value={lang}>
								{languages[lang].name}
							</option>
						))}
					</select>
				</div>
				<CodeMirror
					value={languages[this.state.language].boilerplate}
					options={{
						theme: 'mdn-like',
						lineNumbers: true,
						mode: languages[this.state.language].mode
					}}
				/>
			</div>
		);
	}
}

export default styled(Editor)`
	border: 1px solid #dfe5f4;

	> div:first-child {
		display: flex;
		border-left: 6px solid rgba(0, 83, 159, 0.65);
		flex-direction: row-reverse;
		padding: 0.4em;
		background-color: #fcfcfc;
	}

	> div:first-child > select {
		color: #797df8;
		width: 20ch;
		font-size: 1em;
		padding: 0.2em 0.4em;
		border: 1px solid #797df8;

		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		outline: none;

		background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%238C98F2'><polygon points='0,0 100,0 50,50'/></svg>")
			no-repeat;
		background-size: 0.8em;
		background-position: calc(100% - 1ch) center;
		background-repeat: no-repeat;
		background-color: #efefef;
	}
`;
