const {Deck, StandardDeck, MultiDeck} = require('../deck.js')

test('a standard deck should default to 52 cards without a argument', () => {
	var deck = new StandardDeck();
	deck.initialize();
	expect(deck.cards.length).toBe(52);
})

test('a standard deck should have 52 cards without jokers', () => {
	var deck = new StandardDeck(false);
	deck.initialize();
	expect(deck.cards.length).toBe(52);
})

test('a standard deck should have 54 cards with jokers', () => {
	var deck = new StandardDeck(true);
	deck.initialize();
	expect(deck.cards.length).toBe(54);
})

// test('a multi deck with numDecks=1 and ')