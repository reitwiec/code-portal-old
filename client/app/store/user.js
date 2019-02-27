import { observable, action } from 'mobx';
import { authStore } from 'store';

class UserStore {
	@observable user = null;
	@observable loading = true;

	@action setUser = user => {
		this.user = user;
	};

	@action fetchUser = () => {
		fetch('/api/userdata', { credentials: 'same-origin' })
			.then(res => res.json())
			.then(({ success, data, user }) => {
				if (success && data.loggedIn) {
					this.user = user;
					authStore._setLoginState(true);
				} else if (success) {
					this.user = null;
					authStore._setLoginState(false);
				}
				this.loading = false;
			});
	};
}

export default new UserStore();
