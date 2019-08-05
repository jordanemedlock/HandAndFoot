const {Hand} = require('../app/models/hand.js');
const {Card} = require('../app/models/card.js');
const _ = require('lodash');

test('adding a card to the hand increases size', () => {
	var hand = new Hand();
	hand.addCard(Card.RED_JOKER);
	expect(hand.size()).toBe(1);
	hand.addCard(Card.BLACK_JOKER);
	expect(hand.size()).toBe(2);
})

test('adding many cards to the hand increases size', () => {
	var hand = new Hand();
	var cards = [Card.RED_JOKER, Card.BLACK_JOKER];
	hand.addCards(cards);
	expect(hand.size()).toBe(2);
	hand.addCards(cards);
	expect(hand.size()).toBe(4);
})

test('get returns the card at a position', () => {
	
})
