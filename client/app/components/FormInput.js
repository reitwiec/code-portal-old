import React from 'react';

let FormInput = props => (
	<div className={`form-input ${props.className}`}>
		<input
			{...props}
			type={props.type || 'test'}
			className="field"
			onChange={e => props.onChange(e.target.name, e.target.value)}
		/>
		{props.error && <div className="field-error-msg">{props.error}</div>}
	</div>
);

export default FormInput;
