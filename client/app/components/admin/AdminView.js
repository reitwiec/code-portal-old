import React from 'react';
import styled from 'styled-components';
import { Content } from 'components';
import { Switch, Link, Route } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import ContestForm from './ContestForm';

const contests = [
	{
		id: 1,
		title: 'All Woman Hackathon',
		description: `Booking.com prides itself on their diversity and are now taking ‘Girl Power’ to a whole new level. Our all women hackathon is now in its second edition. On top of bragging rights, the best of the best win a trip to Amsterdam and spend three days hacking with us. There will be 5 system-graded questions coded and scored on HackerRank. Once completed, you will be eligible to win a prize, one of which is a trip to Amsterdam in October 2018 to participate in our 3-day hackathon.`,
		slug: 'AWH'
	},
	{
		id: 2,
		title: '101 Hack',
		description: `Sign up for 101 Hack 55, an algorithm contest that’s all about speed, accuracy and efficiency. You’ll have 3 hours to solve 5-6 challenges. Top 10 coders win HackerRank T-shirts, and could also land a job at HackerRank! We are on the look out for great people to join our team of content engineers. You can find out more about the role on our careers page. See you on the leaderboard!`,
		slug: '101'
	},
	{
		id: 3,
		title: '101 Hack',
		description: `Sign up for 101 Hack 55, an algorithm contest that’s all about speed, accuracy and efficiency. You’ll have 3 hours to solve 5-6 challenges. Top 10 coders win HackerRank T-shirts, and could also land a job at HackerRank! We are on the look out for great people to join our team of content engineers. You can find out more about the role on our careers page. See you on the leaderboard!`,
		slug: '101'
	}
];

const AdminView = ({ className }) => (
	<div className={className}>
		<Content>
			<h1>Contests</h1>
			<Switch>
				<Route exact path="/__admin">
					<div>
						<Link to="/__admin/addContest">
							<label id="add-contest">
								<i className="fa fa-plus" />
								Add a contest
							</label>
						</Link>
						<ReactTable
							data={contests}
							columns={[
								{ Header: 'ID', accessor: 'id' },
								{ Header: 'Slug', accessor: 'slug' },
								{ Header: 'Title', accessor: 'title' },
								{ Header: 'Description', accessor: 'description' }
							]}
						/>
					</div>
				</Route>
				<Route
					exact
					path="/__admin/addContest"
					render={() => <ContestForm />}
				/>
			</Switch>
		</Content>
	</div>
);

export default styled(AdminView)`
	color: #eee;

	h1 {
		color: #374262;
		text-align: left;
		font-weight: 700;
	}

	#add-contest {
		cursor: pointer;
		text-decoration: none;
	}

	i {
		color: #eee;
		margin: 5px;
	}
`;
