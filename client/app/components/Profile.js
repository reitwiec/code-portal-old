import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { Navbar, Button, Content } from 'components';
import { NavLink } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import { avatarLarge } from 'assets';

@inject('authStore', 'profileStore')
@observer
class Profile extends Component {
	componentDidMount() {
		this.props.profileStore.fetchProfile(this.props.username);
	}

	render() {
		const {
			profileStore: {
        profile: {
          name,
          username,
          email,
          organisation,
          regno,
          phone,
          rating
				},
        activities
      },
			authStore: {
				logout
			},
    } = this.props;

		return (
			<div className={this.props.className}>
				<Navbar />
				<Content>
          <div className="area">
            <div className="personal-data">
              <div>{email && <div><span className="lead">Email</span><span className="follow long">{email}</span></div>}</div>
              <div>{phone && <div><span className="lead">Phone</span><span className="follow">{phone}</span></div>}
              {regno && <div><span className="lead">Regno</span><span className="follow">{regno}</span></div>}</div>
            </div>
            <div className="personal-data">
              <div>{email && <div><Button onClick={logout}>Logout</Button></div>}</div>
            </div>
          </div>
					<div className="area">
            <div className="stats">
							<div className="heading1">
								<span id="rank">
									<strong>{name}</strong>
								</span>
								<span className="fadebg1">Profile</span>
							</div>
							<div className="otherstat">
								{/* <div className="box">
									<svg
										id="Capa_1"
										x="0px"
										y="0px"
										viewBox="0 0 94.667 94.667"
										width="512px"
										height="512px">
										<path
											d="M82.413,9.146h9.346V83.33h-9.346V9.146z M63.803,11.831l-1.294,0.402c-1.62,0.512-3.524-0.201-4.179-1.558    c-0.314-0.657-0.329-1.383-0.041-2.047c0.334-0.768,1.044-1.369,1.945-1.65l14.591-4.545l1.776,13.001    c0.1,0.662-0.086,1.338-0.525,1.898c-0.537,0.688-1.4,1.134-2.368,1.226c-0.116,0.012-0.246,0.018-0.371,0.018    c-1.651,0-3.053-1.052-3.261-2.444l-0.225-1.967C52.988,37.514,14.157,62.539,12.472,63.617c-0.572,0.366-1.256,0.561-1.98,0.561    c-0.976,0-1.894-0.36-2.517-0.991c-0.573-0.577-0.841-1.313-0.758-2.069c0.087-0.785,0.558-1.507,1.294-1.975    C8.906,58.889,47.367,34.026,63.803,11.831z M74.859,25.623v57.705h-9.344V25.623H74.859z M58.518,42.77v40.56h-9.347V42.77    H58.518z M41.617,60.583v22.744h-9.345V60.583H41.617z M23.75,69.494v13.834h-9.344V69.494H23.75z M94.666,92.234H0V85.3h94.667    L94.666,92.234L94.666,92.234z"
											fill="#7e7cad"
										/>
									</svg>
									<span className="tooltiptext1">Check Profile</span>
								</div> */}
                {username && <div><span className="lead">Username</span><span className="follow">{username}</span></div>}
                {rating && <div><span className="lead">Rating</span><span className="follow">{rating}</span></div>}
                {organisation && <div><span className="lead">Organisation</span><span className="follow">{organisation}</span></div>}
							</div>
						</div>
						<div className="container">
							<div className="heading">
								<h1>Activity</h1>
								<span className="fadebg1">{name}</span>
							</div>
							<div className="content">
                {activities.length === 0
                  ? <div className="center-align">No activity yet</div>
                  : activities.map((activity, i) => (
                    <div className="activity" key={`activity_${i}`}>
                    </div>
                  ))}
							</div>
						</div>

					</div>

					<div className="beauty">
						<h1>Profile</h1>
					</div>
				</Content>
			</div>
		);
	}
}

var check = keyframes`
0%{
    transform: translateY(-30px);
    opacity:0;
}
100%{
    transform: translateY(0px);
    opacity:1;

}
`;
var check1 = keyframes`
0%{
    transform: translateY(30px);
    opacity:0;
}
100%{
    transform: translateY(0px);
    opacity:1;

}
`;

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

export default styled(Profile)`
	.fadebg1 {
		padding-left: 10px;
		opacity: 0.23;
		color: white;
		font-weight: 900;
		z-index: -1;
		font-size: 70px;
		bottom: -30px;
		left: -10px;
		position: absolute;
	}
	.stats {
		width: 300px;
		height: 300px;
		border-radius: 6px;
		background: #2f2f4b; /* Old browsers */
		background: -moz-radial-gradient(
			center,
			ellipse cover,
			#2f2f4b 9%,
			#26263e 100%
		); /* FF3.6-15 */
		background: -webkit-radial-gradient(
			center,
			ellipse cover,
			#2f2f4b 9%,
			#26263e 100%
		); /* Chrome10-25,Safari5.1-6 */
		background: radial-gradient(
			ellipse at center,
			#2f2f4b 9%,
			#26263e 100%
		); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2f2f4b', endColorstr='#26263e',GradientType=1 );
		border: none;
		filter: drop-shadow(0 0 0.95rem #1f2032);
		animation: ${check1} 2s ease 1;
	}
	.details {
		font-weight: 400;
		font-size: 0.7em;
	}

	.area {
		margin-top: 30px;
		padding-right: 100px;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}

	${Button} {
		top: 20px;
		right: 10px;
		transition: 0.4s;
		position: relative;
		background: #fd6b9a;
	}
	${Button}:hover {
		background: #f77f6e;
	}

	.content {
		filter: drop-shadow(0px 5px 5px #282840);
	}
	.strength {
		margin-left: 60px;
		font-weight: 400;
		font-size: 0.7em;
	}
	.questions {
		position: relative;
		color: #dfdfe7;
		font-size: 1.3em;
		font-weight: 700;
		line-height: 1;
		padding: 10px;
		margin: 20px 0 20px 0;
		background: #2f2e4d;
		transition: 0.2s;
	}
	.questions:hover {
		color: #fff;
		background: #363559;
	}
	.container {
		border-radius: 6px;
		background: #2f2f4b; /* Old browsers */
		background: -moz-radial-gradient(
			center,
			ellipse cover,
			#2f2f4b 9%,
			#26263e 100%
		); /* FF3.6-15 */
		background: -webkit-radial-gradient(
			center,
			ellipse cover,
			#2f2f4b 9%,
			#26263e 100%
		); /* Chrome10-25,Safari5.1-6 */
		background: radial-gradient(
			ellipse at center,
			#2f2f4b 9%,
			#26263e 100%
		); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2f2f4b', endColorstr='#26263e',GradientType=1 );
		width: 60%;
		border: none;
		filter: drop-shadow(0 0 0.95rem #1f2032);
		animation: ${check} 2s ease 1;
	}
	border: none;

	.heading {
		overflow: hidden;
		z-index: 1;
		position: sticky;
		top: 0;
		filter: drop-shadow(0px 5px 5px #282840);
		border-radius: 6px 6px 0 0;
		height: 55px;

		background: linear-gradient(45deg, #fd6b9a, #f77f6e);
		background-size: 400% 400%;
		animation: ${Gradient} 3s ease infinite;
	}
	.heading1 {
		text-align: center;
		overflow: hidden;
		filter: drop-shadow(0px 5px 5px #282840);
		border-radius: 6px 6px 0 0;
		height: 55px;
		background: linear-gradient(45deg, #249ec7, #4cd0c5);
		background-size: 400% 400%;
		animation: ${Gradient} 3s ease infinite;
	}
	h1 {
		line-height: 55px;
		padding-left: 10px;
		color: #fff;
	}
	#rank {
		font-size: 1.2em;
		line-height: 55px;
    color: #fff;
    padding: 0 10px;
	}
	#rank > strong {
    color: #fff;
		font-size: 1.5em;
	}
	#Capa_1 {
		padding-top: 10px;
		width: 35px;
		height: 35px;
	}
	.box {
		position: relative;
		border-radius: 6px;
		text-align: center;
		height: 45px;
		filter: drop-shadow(2px 5px 5px #282840);
		width: 45px;
		background: #249ec7;
		transition: 0.5s;
		svg {
			path {
				fill: #fff;
			}
		}
	}

	.tooltiptext1 {
		visibility: hidden;
		background-color: black;
		color: #fff;
		text-align: center;
		padding: 5px 0;
		border-radius: 6px;
		line-height: 1.5;

		/* Position the tooltip text - see examples below! */
		position: absolute;
		z-index: 1;
		width: 120px;
		top: 130%;
		left: 50%;
		margin-left: -60px;
	}

	.box:hover {
		filter: drop-shadow(0px 0px 8px #1b1b2c);
		cursor: pointer;
		border-radius: 46px;
		border: 1px solid white;
		.tooltiptext1 {
			visibility: visible;
		}
	}
	.tooltiptext1::after {
		content: ' ';
		position: absolute;
		bottom: 100%; /* At the top of the tooltip */
		left: 50%;
		margin-left: -5px;
		border-width: 5px;
		border-style: solid;
		border-color: transparent transparent black transparent;
	}
	.otherstat {
		line-height: 50px;
		flex-dirextion: row;
		flex-wrap: wrap;
		padding-right: 90px;
		margin: 20px;
		position: relative;
		display: flex;
		justify-content: space-between;
	}
	.lead {
		color: #d7d7ef;
		font-weight: 600;
		font-size: 1.2em;
    line-height: 2;
	}
	.beauty {
		bottom: 85px;
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
  .center-align {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    color: rgba(255, 255, 255, 0.6);
    font-weight: bold;
    margin-top: 115px;
  }
  .follow {
    color: rgba(255, 255, 255, 0.8);
    margin-left: 20px;
    line-height: 1.1;
    max-width: 150px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 150px;
  }

  .follow.long {
    width: 300px;
    max-width: 300px;
  }

  .personal-data {
    display: flex;
    flex-direction: column;

    & > div {
      display: flex;
      flex-direction: row;
    }
  }

`;
