import { observable, action } from 'mobx';
import { contestsStore } from 'store';

class QuestionsStore {
	@observable
	questions = [];

	@observable
	body = '';

	@observable
	constraints = '';

	@observable
	id = null;

	@observable
	input_format = '';

	@observable
	level = '';

	@observable
	output_format = '';

	@observable
	score = null;

	@observable
	slug = '';

	@observable
	title = '';

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

	@action fetchQuestion = slug => {
		fetch(`/api/showquestions/${slug}`, { credentials: 'same-origin' })
			.then(resp => resp.json())
			.then(data => {
				if (data.success) {
					Object.keys(data.data).forEach(key => (this[key] = data.data[key]));
					contestsStore.setTitle(data.data.contest.title);
					contestsStore.setSlug(data.data.contest.slug);
				}
			});
	};
}

export default new QuestionsStore();
