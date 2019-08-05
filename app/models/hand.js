const _ = require('lodash');

exports.Hand = Hand = class Hand {
	constructor(cards) {
		this.cards = cards || [];
	}

	addCard(card) {
		this.addCards([card])
	}

	addCards(cards) {
		this.cards = _.concat(this.cards, cards);
	}

	size() {
		return this.cards.length;
	}

}