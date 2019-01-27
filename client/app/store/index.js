import { observable, action, runInAction, configure } from 'mobx';
configure({ enforceActions: 'observed' });

class AuthStore {
	@observable email = '';
	@observable password = '';
	@observable loggedIn = false;
	@observable inProgress = false;

	@action setEmail = value => {
		this.email = value;
	};

	@action setPassword = value => {
		this.password = value;
	};

	login = () => {
		fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: this.email, password: this.password })
		})
			.then(res => res.json())
			.then(data => this._setLoginState(data.success));
		// Set user store from rest of data
		//Redirect to contests page on success
	};

	@action _setLoginState = value => {
		this.loggedIn = value;
	};
}

window.store = new AuthStore();

export default {
	authStore: window.store
};
