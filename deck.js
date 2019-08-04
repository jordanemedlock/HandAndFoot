var {Card, Rank, Suit, Color} = require('./card.js')
var _ = require('lodash')

exports.Deck = Deck = class Deck {

	shuffle(){
		this.cards = _.shuffle(this.cards);
	}

	initialize() {
		this.cards = [];
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
	constructor(numDecks) {
		super();
		this.numDecks = numDecks;
	}

	initialize() {
		super.initialize();
		this.cards = _.chain(this.numDecks)
									.times((i) => new StandardDeck())
									.each((d) => d.initialize())
									.flatMap((d) => d.cards)
									.value();
	}
}