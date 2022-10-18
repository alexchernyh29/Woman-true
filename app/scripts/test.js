export class Test {
	constructor(data) {
		this.data = data;
		this.questions = data.questions;
		this.results = data.results;
		this.activeIndex = 0;
		this.answers = {
			А: 0,
			Б: 0,
			В: 0,
		};

		this.$questionCounter = $(".test__counter-text");
		this.$questionTitle = $(".test__title");
		this.$answerItem = $(".test__item");
		this.$answer = $(".test__answer");

		this.$resultTitle = $(".result__title");
		this.$resultFrameTitle = $(".result__frame-title");
		this.$resultFrameText = $(".result__frame-text");
		this.$resultDescText = $(".result__description-text");
		this.$resultQuote = $(".result__quote");
		this.$resultAuthor = $(".result__author");
	}

	init() {
		this.handleEvents();
		this.renderQuestion();
	}

	handleEvents() {
		this.$answer.on("click", (e) => {
			const id = $(e.target).closest(".test__item").data("id");
			this.answers[id] += 1;
			this.activeIndex += 1;
			if (this.activeIndex === this.questions.length) {
				this.renderResults();
			} else {
				this.renderQuestion();
			}
		});
	}

	renderQuestion() {
		const currentQuestion = this.questions[this.activeIndex];
		const { title, answers } = currentQuestion;
		this.$questionCounter.text(this.activeIndex + 1);
		this.$questionTitle.html(title);
		this.$answerItem.each((id, item) => {
			$(item).find(".test__answer-text").text(answers[id].text);
			$(item).find(".test__sign-text").text(answers[id].id);
		});
	}

	getWinner() {
		let count = 0;
		let winner = "";
		for (let key in this.answers) {
			if (this.answers[key] > count) {
				count = this.answers[key];
				winner = key;
			}
		}
		return winner;
	}

	renderResults() {
		const winner = this.getWinner();
		$("body").removeClass("show-test");
		$("body").addClass("show-result");
		const currentResult = this.results.find((item) => item.id === winner);
		const { id, title, info, description, quote, author } = currentResult;
		this.$resultTitle.text(`Больше ответов ${id}`);
		this.$resultFrameTitle.text(title);
		this.$resultFrameText.text(info);
		this.$resultDescText.text(description);
		this.$resultQuote.text(quote);
		this.$resultAuthor.text(author);
	}
}
