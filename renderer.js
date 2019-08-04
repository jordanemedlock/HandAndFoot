var {Card, Suit, Rank, Color} = require('./card.js')
var _ = require('lodash')

exports.Renderer = Renderer = class Renderer {
	constructor() {

	}
	render(value) {
		return '';
	}
}

exports.SuitRenderer = SuitRenderer = class SuitRenderer extends Renderer {
	constructor(hearts, diamonds, clubs, spades) {
		super();
		this.hearts = hearts;
		this.diamonds = diamonds;
		this.clubs = clubs;
		this.spades = spades;
	}

	render(value){
		switch(value) {
			case Suit.HEARTS:
				return this.hearts;
			case Suit.DIAMONDS:
				return this.diamonds;
			case Suit.CLUBS:
				return this.clubs;
			case Suit.SPADES:
				return this.spades;
		}
	}
}

exports.RankRenderer = RankRenderer = class RankRenderer extends Renderer {
	constructor(map) {
		super();
		this.map = map;
	}

	render(value) {
		return this.map[value.value];
	}
}

exports.CardRenderer = CardRenderer = class CardRenderer extends Renderer {
	constructor(rankRenderer, suitRenderer, combine) {
		super();
		this.rankRenderer = rankRenderer;
		this.suitRenderer = suitRenderer;
		this.combine = combine;
	}

	render(value) {
		var r = this.rankRenderer.render(value.getRank())
		var s = this.suitRenderer.render(value.getSuit())
		return this.combine(r, s)
	}
}

exports.DeckRenderer = DeckRenderer = class DeckRenderer extends Renderer {
	constructor(cardRenderer, separator) {
		super();
		this.cardRenderer = cardRenderer
		this.separator = separator
	}

	render(value){
		return _.chain(value.cards).map((card) => this.cardRenderer.render(card)).join(this.separator).value();
	}
}

