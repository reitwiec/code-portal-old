import { observable, action } from 'mobx';
import { contestsStore } from 'store';
import io from 'socket.io-client';


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

	source = '';

	language = 1;

	submission = null;

	@observable
	points = 0;

	@observable
	verdict = '';

	@observable
	cases = []

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

	fetchSubmission() {
		fetch(`/api/submission?id=${this.submission}`, {
			credentials: 'same-origin'
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					this.points = data.data.sub.points;
					this.verdict = data.data.sub.verdict;
					this.cases = data.data.cases;
					console.log(this.points, this.verdict, this.cases);
				}
			});
	}

	@action submitAnswer = () => {
		console.log(this.id, this.source, this.language);

		const socket = io.connect('http://localhost:3000');
		socket.on('connect', () => {
			fetch('/api/submit', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({question: this.id, source: this.source, language: this.language}),
				credentials: 'same-origin'
			})
				.then(res => res.json())
				.then(({ success, user, data }) => {
					if (success) {
						this.submission = data;
						console.log('submission', this.submission);
						this.fetchSubmission()
					}
				});
		});

		socket.on('testcase_result', data => {
			console.log('testcase_result', data);
			this.cases.forEach((c, i) => {
				if(c.id === data.id)
					this.cases[i] = { ...this.cases[i], ...data };
			})
		});

		socket.on('submission_result_ce', data => {
			console.log('submission_result_ce', data);
			if (data.id !== this.submission) return;
			console.log('disconnecting...');
			socket.disconnect();
			this.submission = null;
		});

		socket.on('submission_result', data => {
			console.log('submission_result', data);
			if (data.id !== this.submission) return;
			// this.cases.forEach(case => {
			// 	if(case.id === data.)
			// });
			console.log('disconnecting...');
			socket.disconnect();
			this.submission = null;
		});
		socket.on('disconnect', () => {
			console.log('disconnected');
		});
	};

	@action updateCode = (editor, data, value) => {
		this.source = value;
	};

	@action updateLanguage = language => {
		this.language = 1;//language;
	};
}

export default new QuestionsStore();
