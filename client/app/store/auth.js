import { observable, action } from 'mobx';
import { userStore } from 'store';

class AuthStore {
	@observable email = '';
	@observable password = '';
	@observable isLoggedIn = false;
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
			.then(({ success, user }) => {
				this._setLoginState(success);
				if (success) {
					userStore.setUser(user);
				}
			});
	};

	@action _setLoginState = value => {
		this.isLoggedIn = value;
	};
}

export default new AuthStore();
