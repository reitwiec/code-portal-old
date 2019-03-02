import { observable, action } from 'mobx';
import { contestsStore } from 'store';

class QuestionsStore {
	@observable
	questions = [];

	@action fetchQuestions = slug => {
		fetch(`/api/showcontest/${slug}`, { credentials: 'same-origin' })
			.then(resp => resp.json())
			.then(data => {
				if (data.success) {
					contestsStore.setTitle(data.data.contest.title);
					contestsStore.setSlug(data.data.contest.slug);
					this.questions = data.data.questions;
				}
			});
	};
}

export default new QuestionsStore();
