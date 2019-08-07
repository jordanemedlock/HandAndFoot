const {Deck, StandardDeck, MultiDeck} = require('../app/models/deck.js');
const _ = require('lodash');

describe('StandardDeck', () => {
	test('has 52 cards without an argument', () => {
		var deck = new StandardDeck();
		deck.initialize();
		expect(deck.size()).toBe(52);
	})

	test('has 52 cards without jokers', () => {
		var deck = new StandardDeck(false);
		deck.initialize();
		expect(deck.size()).toBe(52);
	})

	test('has 54 cards with jokers', () => {
		var deck = new StandardDeck(true);
		deck.initialize();
		expect(deck.size()).toBe(54);
	})
})

describe('MultiDeck', () => {
	test.each([
			[1, false], [2, false], [10, false],
			[1, true], [2, true], [10, true],
			[0, true], [0, false]
		])(
		'has n*m cards with n decks and m cards per deck', 
		(n, jokers) => {
			var deck = new MultiDeck(n, () => new StandardDeck(jokers));
			deck.initialize();
			expect(deck.size()).toBe((jokers?54:52) * n);
		}
	)
})

describe('Deck', () => {

	test('shuffling doesnt change its size', () => {
		var deck = new StandardDeck();
		deck.initialize();
		var priorLength = deck.size();
		deck.shuffle();
		var postLength = deck.size();
		expect(postLength).toBe(priorLength);
	})

	test('shuffling contains all the same cards afterwards', () => {
		var deck1 = new StandardDeck();
		deck1.initialize();
		var deck2 = new StandardDeck();
		deck2.initialize();
		expect(_.every(deck1.cards, (c) => deck2.contains(c))).toBe(true);

		deck1.shuffle();
		expect(_.every(deck1.cards, (c) => deck2.contains(c))).toBe(true);

		deck2.shuffle();
		expect(_.every(deck1.cards, (c) => deck2.contains(c))).toBe(true);
	})

	test('contains returns true for a standard deck containing AH', () => {
		var deck = new StandardDeck();
		deck.initialize();
		var ah = new Card(Rank.ACE, Suit.HEARTS);
		expect(deck.contains(ah)).toBe(true);
	})

	test('drawing a card decreases size by 1 and returns one card', () => {
		var deck = new StandardDeck();
		deck.initialize();
		var priorSize = deck.size();
		var cards = deck.draw(1);
		expect(deck.size()).toBe(priorSize-1);
		expect(cards.length).toBe(1);
		expect(_.some(cards, (c) => deck.contains(c))).toBe(false);
	})

	test('drawing multiple cards decreases size by n and returns n cards', () => {
		var n = 5;
		var deck = new StandardDeck();
		deck.initialize();
		var priorSize = deck.size();
		var cards = deck.draw(n);
		expect(deck.size()).toBe(priorSize-n);
		expect(cards.length).toBe(n);
		expect(_.some(cards, (c) => deck.contains(c))).toBe(false);
	})

	test('drawing cards from the bottom decreases size and no longer has those items', () => {
		var n = 5;
		var deck = new StandardDeck();
		deck.initialize();
		var priorSize = deck.size();
		var cards = deck.drawFromBottom(n);
		expect(deck.size()).toBe(priorSize-n);
		expect(cards.length).toBe(n);
		expect(_.some(cards, (c) => deck.contains(c))).toBe(false);
	})
})
