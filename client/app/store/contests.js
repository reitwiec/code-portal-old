import { observable, action } from 'mobx';

class ContestsStore {
	@observable
	contests = {};

	@action fetchContests = () => {
		fetch('/api/showcontests', { credentials: 'same-origin' })
			.then(resp => resp.json())
			.then(data => {
				if (data.success) {
					this.contests = data.data.reduce((a, c) => ({ ...a, [c.id]: c }), {});
				}
			});
	};

	@action getContests = () =>
		Object.keys(this.contests).map(id => this.contests[id]);
}

export default new ContestsStore();
