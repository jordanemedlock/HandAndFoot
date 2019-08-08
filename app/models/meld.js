const {Card, Rank, Suit} = require('./card.js')
const _ = require('lodash')

exports.Meld = Meld = class Meld {
	constructor(rank, cards) {
		this.rank = rank;
		this.cards = cards;
		this.isValid = false;
	}

	validate() {
		this.isValid = this.isValid ||
									 this.isNormalMeld() ||
									 this.isWildMeld() ||
									 this.isRedThrees();
		return this.isValid;
	}

	isNormalMeld() {
		const numRank = this.numRank();
		const numWild = this.numWild();
		const total = numRank + numWild;
		const size = this.size();
		const ret = this.getRank().isNormalCard() && total == size && numRank >= 2 && total >= 3;
		return ret;
	}

	isWildMeld() {
		const ret = this.getRank().isWild() && _.every(this.cards, (c) => c.isWild());
		return ret;
	}

	isRedThrees() {
		const ret = _.every(this.cards, (c) => c.isRedThree())
		return ret;
	}

	numRank() {
		return _.chain(this.cards)
						.filter((c) => c.getRank().equals(this.rank))
						.size()
						.value();
	}

	numWild() {
		return _.chain(this.cards)
						.filter((c) => c.isWild())
						.size()
						.value();
	}

	isBook() {
		return this.size() >= 7 && !this.getRank().isThree();
	}

	getBookKind() {
		if (!this.isBook()) {
			return null;
		}
		if (this.getRank().isWild()) {
			return 'WILD';
		}
		if (this.getRank().isNormalCard()) {
			if (this.numWild() > 0) {
				return 'DIRTY';
			}	else {
				return 'PURE';
			}
		}

		return null; // shouldn't be able to get here.
	}

	addCard(card) {
		this.addCards([card]);
	}

	addCards(cards) {
		this.isValid = false;
		this.cards = _.concat(this.cards, cards);
	}

	size() {
		return this.cards.length;
	}

	getRank() {
		return this.rank;
	}

	count() {
		if (this.getRank().isThree()) {
			return 0;
		}
		return _.chain(this.cards)
						.map((c) => c.points())
						.reduce((a,b) => a + b, 0)
						.value();
	}

	points() {
		if (!this.isValid) {
			return null;
		}
		return this.count() + this.base();
	}

	base() {
		if (this.getRank().isThree()) {
			return _.chain(this.cards)
							.map((c) => c.points())
							.reduce((a,b) => a + b, 0)
							.value();
		}
		if (!this.isBook()) {
			return 0;
		}
		switch (this.getBookKind()) {
			case 'DIRTY':
				return 300;
			case 'PURE':
				return 500;
			case 'WILD': 
				return 1000;
			default:
				return 0;
		}
	}
}