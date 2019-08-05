const _ = require('lodash')

exports.Table = Table = class Table {
	constructor() {
		this.meld = {};
	}

	getMeld(rank) {
		return this.meld[rank.value];
	}

	addMeld(rank, set) {
		this.meld[rank.value] = set;
	}

}


exports.Meld = Meld = class Meld {
	constructor(rank, cards) {
		this.rank = rank;
		this.cards = cards;
	}

	validate() {
		const atLeastThree = this.atLeastThreeCards();
		const allSame = this.allSameRank();
		return atLeastThree && allSame;
	}


	atLeastThreeCards() {
		return this.cards.length >= 3;
	}

	allSameRank() {
		return (
			this.rank.equals(this.cards[0].getRank()) && 
			_.every(this.cards, (c) => c.getRank().equals(this.rank))
		);
	}

	addCard(card) {
		this.addCards([card]);
	}

	addCards(cards) {
		this.cards = _.concat(this.cards, cards);
	}

	size() {
		return this.cards.length;
	}

	getRank() {
		return this.rank;
	}
}