import React, { Component } from 'react';
import styled from 'styled-components';
import { ContestCard, Sidebar } from 'components';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@inject('contestsStore')
@observer
class ContestView extends Component {
	componentDidMount() {
		this.props.contestsStore.fetchContests();
	}

	onClick = slug => this.props.history.push(`/contest/${slug}`);

	render() {
		const {
			contestsStore: { fetchContests, contests }
		} = this.props;
		return (
			<div className={this.props.className}>
				<h1>Contests</h1>
				<span>Overview</span>
				<div>
					{contests.map((contest, i) => (
						<ContestCard
							onClick={this.onClick}
							contest={contest}
							key={`contest_${i}`}
							joined={i % 2}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default styled(withRouter(ContestView))`
	display: flex;
	flex-direction: column;
	font-size: 20px;
	justify-content: flex-end;

	> h1 {
		color: #374262;
		text-align: left;
		font-weight: 700;
	}

	> span {
		padding-left: 2px;
		color: #374262;
		text-align: left;
		font-size: 0.8em;
		font-weight: 400;
	}

	> div {
		padding-top: 2em;
		display: flex;
		flex-direction: column;
		justify-content: left;
	}
`;
