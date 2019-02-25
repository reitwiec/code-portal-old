import { observable, action } from 'mobx';
import Validator from 'validatorjs';

class RegisterStore {
	@observable
	fields = {
		name: { value: '', error: null, rule: 'required|min:3|max:50' },
		password: {
			value: '',
			error: null,
			rule: 'required|confirmed|min:8|max:30'
		},
		password_confirmation: {
			value: '',
			error: null,
			rule: 'required|min:8|max:30'
		},
		email: { value: '', error: null, rule: 'required|email' },
		organisation: { value: '', error: null, rule: 'required|max:100' },
		regno: { value: '', error: null, rule: 'max:20' },
		username: { value: '', error: null, rule: 'required|max:50' },
		phone: { value: '', error: null, rule: 'max:20' }
	};
	@observable
	meta = {
		isValid: true,
		msg: null,
		success: null
	};

	@action
	onFieldChange = (field, value) => {
		this.fields[field].value = value;
		var validation = new Validator(
			Object.keys(this.fields).reduce(
				(a, c) => ({ ...a, [c]: this.fields[c].value }),
				{}
			),
			Object.keys(this.fields).reduce(
				(a, c) => ({ ...a, [c]: this.fields[c].rule }),
				{}
			)
		);
		this.meta.isValid = validation.passes();
		if (field === 'password' || field === 'password_confirmation') {
			this.fields.password.error =
				validation.errors.first('password') === false
					? null
					: validation.errors.first('password');
			this.fields.password_confirmation.error =
				validation.errors.first('password_confirmation') === false
					? null
					: validation.errors.first('password_confirmation');
		} else {
			this.fields[field].error =
				validation.errors.first(field) === false
					? null
					: validation.errors.first(field);
		}
	};

	@action
	onSubmit = () => {
		const postData = Object.keys(this.fields).reduce(
			(a, c) => ({ ...a, [c]: this.fields[c].value }),
			{}
		);
		fetch('/api/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(postData)
		})
			.then(res => res.json())
			.then(({ success, msg }) => {
				this.meta.success = success;
				this.meta.msg = msg;
			});
	};
}

export default new RegisterStore();
