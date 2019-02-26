import { observable, action } from 'mobx';
import { userStore } from 'store';
import Validator from 'validatorjs';

class AuthStore {
	@observable email = '';
	@observable password = '';
	@observable isLoggedIn = false;
	@observable inProgress = false;

	@observable
	meta = {
		success: false,
		msg: null
	};

	@action setEmail = value => {
		this.email = value;
	};

	@action setPassword = value => {
		this.password = value;
	};

	login = e => {
		e.preventDefault();
		const validation = new Validator({ email: this.email }, { email: 'email' });
		const isValidEmail = validation.passes();
		if (this.email === '') {
			this.meta.msg = 'Email is required';
			return;
		} else if (this.password === '') {
			this.meta.msg = 'Password is required';
			return;
		} else if (!isValidEmail) {
			this.meta.msg = 'Invalid email';
			return;
		}
		fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: this.email, password: this.password })
		})
			.then(res => res.json())
			.then(({ success, user, msg }) => {
				this._setLoginState(success);
				if (success) {
					userStore.setUser(user);
				} else this.meta.msg = msg;
			});
	};

	@action _setLoginState = value => {
		this.isLoggedIn = value;
	};
}

export default new AuthStore();
