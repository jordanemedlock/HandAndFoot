require('lodash.product')
const _ = require('lodash')
const {Card, Rank, Suit, Color} = require('../app/models/card.js')
const {Meld} = require('../app/models/meld.js')
const {simpleCardRenderer} = require('../app/views/textRenderer.js')

exports.cards = cards = _.chain(Rank.ALL)
												 .product(Suit.ALL)
												 .map(([r,s]) => new Card(r, s))
												 .keyBy((c) => simpleCardRenderer.render(c))
												 .value();

exports.getCards = getCards = function() {
	return _.chain(arguments)
					.map((arg) => cards[arg])
					.value();
}

exports.getPureMeld = getPureMeld = function(rank, n) {
	return new Meld(rank, _.chain(n)
												 .times(() => _.sample(Suit.ALL))
												 .map((s) => new Card(rank, s))
												 .value()
												 )
}

exports.getDirtyMeld = function(rank, n, nTwos) {
	var meld = getPureMeld(rank, n);
	meld.addCards(_.chain(nTwos)
								 .times(() => _.sample(Suit.ALL))
								 .map((s) => new Card(Rank.TWO, s))
								 .value());
	return meld;
}

