import React from 'react';
import styled from 'styled-components';

const Gauge = ({ className, color, size, percentage }) => (
	<div className={className}>
		<svg width={size} height={size}>
			<circle
				id="mask"
				r="35%"
				cx="50%"
				cy="50%"
				stroke="#f6f6f6"
				stroke-width="15%"
				fill="none"
			/>
			<circle
				id="bar"
				r="35%"
				cx="50%"
				cy="50%"
				stroke={color}
				stroke-width="15%"
				stroke-dasharray={`${percentage * 100} 100`}
				stroke-linecap="round"
				transform="rotate(-90)"
				fill="none"
			/>
		</svg>
	</div>
);

export default styled(Gauge)`
	display: inline-block;
	width: ${({ size }) => size};
	height: ${({ size }) => size};

	#bar {
		transform-origin: 50% 50%;
	}
`;
