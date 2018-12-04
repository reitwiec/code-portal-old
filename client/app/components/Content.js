import React, { Component } from 'react';
import styled from 'styled-components';
// import Joinbtn from './Joinbtn.js'
// Just testing the content part
class Content extends Component {
	render() {
		return (
			<div id="content" className={this.props.className}>
				<h1 id="">Contests</h1>
				<span id="">Overview</span>
				<div className="contestCards">
					<div id="1">
						<h3>All Woman Hackathon</h3>
						<h4>Booking.com</h4>
						{/* 480 characters */}
						<p>
							Booking.com prides itself on their diversity and are now taking
							‘Girl Power’ to a whole new level. Our all women hackathon is now
							in its second edition. On top of bragging rights, the best of the
							best win a trip to Amsterdam and spend three days hacking with us.
							There will be 5 system-graded questions coded and scored on
							HackerRank. Once completed, you will be eligible to win a prize,
							one of which is a trip to Amsterdam in October 2018 to participate
							in our 3-day hackathon.
						</p>
						{/* <Joinbtn/> */}
					</div>

					<div id="joined">
						<h3>101 Hack 55</h3>
						<h4>HackerRank</h4>
						{/* 480 characters */}
						<p>
							Sign up for 101 Hack 55, an algorithm contest that’s all about
							speed, accuracy and efficiency. You’ll have 3 hours to solve 5-6
							challenges. Top 10 coders win HackerRank T-shirts, and could also
							land a job at HackerRank! We are on the look out for great people
							to join our team of content engineers. You can find out more about
							the role on our careers page. See you on the leaderboard!
						</p>
					</div>
					<div>
						<h3>All Woman Hackathon</h3>
						<h4>Booking.com</h4>
						{/* 480 characters */}
						<p>
							Booking.com prides itself on their diversity and are now taking
							‘Girl Power’ to a whole new level. Our all women hackathon is now
							in its second edition. On top of bragging rights, the best of the
							best win a trip to Amsterdam and spend three days hacking with us.
							There will be 5 system-graded questions coded and scored on
							HackerRank. Once completed, you will be eligible to win a prize,
							one of which is a trip to Amsterdam in October 2018 to participate
							in our 3-day hackathon.
						</p>
					</div>
					<div>
						<h3>All Woman Hackathon</h3>
						<h4>Booking.com</h4>
						{/* 480 characters */}
						<p>
							Booking.com prides itself on their diversity and are now taking
							‘Girl Power’ to a whole new level. Our all women hackathon is now
							in its second edition. On top of bragging rights, the best of the
							best win a trip to Amsterdam and spend three days hacking with us.
							There will be 5 system-graded questions coded and scored on
							HackerRank. Once completed, you will be eligible to win a prize,
							one of which is a trip to Amsterdam in October 2018 to participate
							in our 3-day hackathon.
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default styled(Content)`
	display: flex;
	position: relative;
	top: 50px;
	left: 220px;
	flex-direction: column;
	font-size: 20px;
	justify-content: flex-end;

	h1 {
		color: #374262;
		text-align: left;
		font-weight: 700;
		margin: 20px 0 0 0;
	}

	span {
		padding-left: 2px;
		margin: -5px 0 0 0;
		color: #374262;
		text-align: left;
		font-size: 0.8em;
		font-weight: 400;
	}

	.contestCards {
		display: flex;
		flex-direction: column;
		justify-content: left;
		height: 100vh;
		flex-wrap: no-wrap;
	}

	.contestCards div {
		margin-top: 50px;
		border-radius: 20px;
		background-color: #787cf7;
		/* text-overflow: ellipsis;
	    white-space: nowrap; 
	    overflow: hidden; */
		width: 55%;
		height: 200px;
		text-align: left;
		filter: drop-shadow(8px 9px 8px rgba(0, 0, 0, 0.13));
	}

	.contestCards div h3 {
		color: #fff;
		font-size: 1.4em;
		font-weight: 600;
		margin: 24px 0 -5px 30px;
	}

	.contestCards div p {
		margin: 0px 30px 10px 30px;
		color: #fff;
		font-size: 0.7em;
		text-align: left;

		height: 100px;

		/* text-overflow: ellipsis;
	    overflow: hidden; */
	}

	.contestCards div h4 {
		color: #fff;
		opacity: 0.5;
		font-size: 0.5em;
		font-weight: 600;
		margin: 0px 0 5px 30px;
	}
`;
