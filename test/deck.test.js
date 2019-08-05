const {Deck, StandardDeck, MultiDeck} = require('../app/models/deck.js');
const _ = require('lodash');

test('a standard deck should default to 52 cards without a argument', () => {
	var deck = new StandardDeck();
	deck.initialize();
	expect(deck.size()).toBe(52);
})

test('a standard deck should have 52 cards without jokers', () => {
	var deck = new StandardDeck(false);
	deck.initialize();
	expect(deck.size()).toBe(52);
})

test('a standard deck should have 54 cards with jokers', () => {
	var deck = new StandardDeck(true);
	deck.initialize();
	expect(deck.size()).toBe(54);
})

test('a multi deck with numDecks=1 and new StandardDeck(false) should have 52 cards', () => {
	var deck = new MultiDeck(1, () => new StandardDeck(false));
	deck.initialize();
	expect(deck.size()).toBe(52);
})

test('a multi deck with numDecks=3 and new StandardDeck(true) should have 54*3 cards', () => {
	var deck = new MultiDeck(3, () => new StandardDeck(true));
	deck.initialize();
	expect(deck.size()).toBe(54*3);
})

test('shuffling a deck doesnt change its size', () => {
	var deck = new StandardDeck();
	deck.initialize();
	var priorLength = deck.size();
	deck.shuffle();
	var postLength = deck.size();
	expect(postLength).toBe(priorLength);
})

test('shuffling a deck contains all the same cards afterwards', () => {
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

test('drawing a card decreases decksize by 1 and returns one card', () => {
	var deck = new StandardDeck();
	deck.initialize();
	var priorSize = deck.size();
	var cards = deck.draw(1);
	expect(deck.size()).toBe(priorSize-1);
	expect(cards.length).toBe(1);
	expect(_.some(cards, (c) => deck.contains(c))).toBe(false);
})

test('drawing multiple cards decreases decksize by n and returns n cards', () => {
	var n = 5;
	var deck = new StandardDeck();
	deck.initialize();
	var priorSize = deck.size();
	var cards = deck.draw(n);
	expect(deck.size()).toBe(priorSize-n);
	expect(cards.length).toBe(n);
	expect(_.some(cards, (c) => deck.contains(c))).toBe(false);
})

test('drawing cards from the bottom decreases decksize and no longer has those items', () => {
	var n = 5;
	var deck = new StandardDeck();
	deck.initialize();
	var priorSize = deck.size();
	var cards = deck.drawFromBottom(n);
	expect(deck.size()).toBe(priorSize-n);
	expect(cards.length).toBe(n);
	expect(_.some(cards, (c) => deck.contains(c))).toBe(false);
})
