import React, { Component } from 'react';
import { TextArea, TextField } from 'components';
import styled from 'styled-components';

class ContestForm extends Component {
	state = {
		title: '',
		start: '',
		end: '',
		description: '',
		visibility: null,
		slug: ''
	};

	updateField = field => {
		return value => {
			this.setState({ [field]: value });
		};
	};

	render() {
		return (
			<div className={this.props.className}>
				<TextField label="Title" onChange={this.updateField('title')} />
				<TextField label="Start Date" onChange={this.updateField('start')} />
				<TextField label="End Date" onChange={this.updateField('end')} />
				<TextArea
					label="Description"
					onChange={this.updateField('description')}
				/>
				<TextField label="" onChange={this.updateField('')} />
			</div>
		);
	}
}

export default styled(ContestForm)`
	display: flex;
	flex-flow: column nowrap;
`;
