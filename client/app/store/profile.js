import { observable, action } from 'mobx';
import { contestsStore } from 'store';

class ProfileStore {
	@observable
	profile = {
    name: '',
    username: '',
    email: '',
    organisation: '',
    regno: '',
    phone: '',
    rating: '',
  };

  @observable
  activities = [];

	@action fetchProfile = slug => {
    Object.keys(this.profile).forEach(key => this.profile[key] = '');
		fetch(`/api/profile/${slug}`, { credentials: 'same-origin' })
			.then(resp => resp.json())
			.then(data => {
				if (data.success)
          this.profile = {...this.profile, ...data.data}
			});
	};

}

export default new ProfileStore();
