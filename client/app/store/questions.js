import { observable, action } from 'mobx';

class QuestionsStore {
	@observable
	questions = {};

	@action fetchQuestions = slug => {
		console.log('asdasdasd');
		fetch(`/api/showquestionsbycontest/${slug}`, { credentials: 'same-origin' })
			.then(resp => resp.json())
			.then(data => {
				if (data.success) {
					this.questions = data.data.reduce(
						(a, c) => ({ ...a, [c.id]: c }),
						{}
					);
				}
			});
	};

	@action getQuestions = () =>
		Object.keys(this.questions).map(id => this.questions[id]);
}

export default new QuestionsStore();
