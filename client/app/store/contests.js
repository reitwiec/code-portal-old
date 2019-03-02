import { observable, action } from 'mobx';

class ContestsStore {
	@observable
	contests = [];

	@observable
	title = '';

	@observable
	slug = '';

	@action setTitle = title => (this.title = title);
	@action setSlug = slug => (this.slug = slug);

	@action fetchContests = () => {
		fetch('/api/showcontests', { credentials: 'same-origin' })
			.then(resp => resp.json())
			.then(data => {
				if (data.success) {
					this.contests = data.data;
				}
			});
	};
}

export default new ContestsStore();
