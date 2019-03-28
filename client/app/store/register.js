import { observable, action } from 'mobx';
import Validator from 'validatorjs';

class RegisterStore {

	@observable
	captcha = null;

	captchaDOM = null;

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
	onResolved = key => this.captcha = key;

	@action
	setCaptchaDOM = captcha => this.captchaDOM = captcha;

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
		if (!this.captcha) {
			this.meta.success = false;
			this.meta.msg = 'Please fill the captcha';
			return;
		}
		this.captchaDOM.reset();
		let postData = Object.keys(this.fields).reduce(
			(a, c) => ({ ...a, [c]: this.fields[c].value }),
			{}
		);
		postData = {...postData, 'g-recaptcha-response': this.captcha};
		fetch('/api/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(postData),
			credentials: 'same-origin'
		})
			.then(res => res.json())
			.then(({ success, msg }) => {
				this.meta.success = success;
				this.meta.msg = msg;
				if(success)
					Object.keys(this.fields).forEach(key => this.fields[key].value = '');
			});
	};

}

export default new RegisterStore();
