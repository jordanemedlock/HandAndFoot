var {Card, Rank, Suit, Color} = require('./card.js')
var _ = require('lodash')

exports.Deck = Deck = class Deck {

	shuffle(){
		this.cards = _.shuffle(this.cards);
	}

	initialize() {
		this.cards = [];
	}

	size() {
		return this.cards.length;
	}

	contains(card) {
		return _.some(this.cards, (c) => c.equals(card));
	}

	// end of the array is top
	// top of deck is where you can see the back of the card
	drawFromTop(n) {
		var start = this.cards.length - n - 1;
		var ret = this.cards.splice(start, n);
		return ret;
	}

	// start of array is back
	// bottom is where you can see what card it is when you pull
	drawFromBottom(n) {
		return this.cards.splice(0, n);
	}

	// synonym for drawFromTop
	draw(n) { 
		return this.drawFromTop(n); 
	}
}

exports.StandardDeck = StandardDeck = class StandardDeck extends Deck {
	constructor(withJoker) {
		super();
		this.withJoker = !!withJoker
	}

	initialize() {
		var simpleRanks = _.filter(Rank.ALL, (r) => r != Rank.JOKER);
		this.cards = _.chain(simpleRanks)
									.flatMap((rank) => 
										_.map(Suit.ALL, (suit) => 
											new Card(rank, suit)))
									.concat(this.withJoker ? [Card.RED_JOKER, Card.BLACK_JOKER] : [])
									.value()
	}
}

exports.MultiDeck = MultiDeck = class MultiDeck extends Deck {
	constructor(numDecks, deckMaker) {
		super();
		this.numDecks = numDecks;
		this.deckMaker = deckMaker;
	}

	initialize() {
		super.initialize();
		this.cards = _.chain(this.numDecks)
									.times(this.deckMaker)
									.each((d) => d.initialize())
									.flatMap((d) => d.cards)
									.value();
	}
}