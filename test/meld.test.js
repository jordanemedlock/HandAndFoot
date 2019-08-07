const {Meld} = require('../app/models/meld.js')
const {Card, Rank, Suit} = require('../app/models/card.js')

test('creating a simple meld and validating it', () => {
	var rank = Rank.FIVE;
	var cards = [
		new Card(Rank.FIVE, Suit.DIAMONDS), 
		new Card(Rank.FIVE, Suit.HEARTS),
		new Card(Rank.FIVE, Suit.CLUBS)
	];
	var meld = new Meld(rank, cards);
	expect(meld.validate()).toBe(true);
})

test('less than three cards cant make a meld', () => {
	var rank = Rank.FIVE;
	var cards = [
		new Card(Rank.FIVE, Suit.DIAMONDS), 
		new Card(Rank.FIVE, Suit.HEARTS),
	];
	var meld = new Meld(rank, cards);
	expect(meld.validate()).toBe(false);
})

test('three cards different suits cant make a meld', () => {
	var rank = Rank.FIVE;
	var cards = [
		new Card(Rank.FIVE, Suit.HEARTS), 
		new Card(Rank.FIVE, Suit.HEARTS),
		new Card(Rank.SIX, Suit.HEARTS),
	];
	var meld = new Meld(rank, cards);
	expect(meld.validate()).toBe(false);
})

test('adding cards to a created meld', () => {
	var rank = Rank.FIVE;
	var cards = [
		new Card(Rank.FIVE, Suit.HEARTS), 
		new Card(Rank.FIVE, Suit.DIAMONDS),
		new Card(Rank.FIVE, Suit.HEARTS),
	];
	var meld = new Meld(rank, cards);
	meld.addCard(new Card(Rank.FIVE, Suit.CLUBS));
	expect(meld.validate()).toBe(true);
	expect(meld.size()).toBe(4);
})

test('testing weird combinations of cards', () => {
	var meld = new Meld(Rank.FIVE, [
		new Card(Rank.FIVE, Suit.HEARTS),
		new Card(Rank.FIVE, Suit.CLUBS),
		new Card(Rank.TWO, Suit.SPADES)
	])
	expect(meld.validate()).toBe(true);

	meld = new Meld(Rank.EIGHT, [
		new Card(Rank.EIGHT, Suit.SPADES),
		new Card(Rank.TWO, Suit.SPADES),
		Card.RED_JOKER
	])
	expect(meld.validate()).toBe(false);

	meld = new Meld(Rank.TWO, [
		new Card(Rank.TWO, Suit.SPADES),
		new Card(Rank.TWO, Suit.SPADES),
		Card.BLACK_JOKER
	])
	expect(meld.validate()).toBe(true);

	meld = new Meld(Rank.THREE, [
		new Card(Rank.THREE, Suit.HEARTS)
	])
	expect(meld.validate()).toBe(true);

	meld = new Meld(Rank.THREE, [
		new Card(Rank.THREE, Suit.SPADES),
		new Card(Rank.THREE, Suit.CLUBS),
		new Card(Rank.THREE, Suit.SPADES)
	])
	expect(meld.validate()).toBe(false);

	meld = new Meld(Rank.THREE, [
		new Card(Rank.THREE, Suit.HEARTS),
		new Card(Rank.THREE, Suit.HEARTS),
		new Card(Rank.THREE, Suit.DIAMONDS)
	])
	expect(meld.validate()).toBe(true);

	meld = new Meld(Rank.THREE, [
		new Card(Rank.THREE, Suit.HEARTS),
		new Card(Rank.THREE, Suit.HEARTS),
		new Card(Rank.TWO, Suit.DIAMONDS)
	])
	expect(meld.validate()).toBe(false);
})


test('test isBook and getBookKind on red canasta', () => {
	var meld = new Meld(Rank.FIVE, [
		new Card(Rank.FIVE, Suit.HEARTS),
		new Card(Rank.FIVE, Suit.DIAMONDS),
		new Card(Rank.FIVE, Suit.CLUBS)
	])
	expect(meld.validate()).toBe(true);
	expect(meld.isBook()).toBe(false);
	expect(meld.getBookKind()).toBe(null);

	meld.addCards([
		new Card(Rank.FIVE, Suit.HEARTS),
		new Card(Rank.FIVE, Suit.SPADES),
		new Card(Rank.FIVE, Suit.DIAMONDS),
		new Card(Rank.FIVE, Suit.HEARTS)
	])
	expect(meld.validate()).toBe(true);
	expect(meld.isBook()).toBe(true);
	expect(meld.getBookKind()).toBe('PURE');

})

test('test isBook and getBookKind on black canasta', () => {
	var meld = new Meld(Rank.FIVE, [
		new Card(Rank.FIVE, Suit.HEARTS),
		new Card(Rank.FIVE, Suit.DIAMONDS),
		new Card(Rank.FIVE, Suit.CLUBS),
		Card.RED_JOKER,
		new Card(Rank.FIVE, Suit.SPADES),
		new Card(Rank.TWO, Suit.DIAMONDS),
		new Card(Rank.FIVE, Suit.HEARTS)
	])
	expect(meld.validate()).toBe(true);
	expect(meld.isBook()).toBe(true);
	expect(meld.getBookKind()).toBe('DIRTY');

})

test('test isBook and getBookKind on wild canasta', () => {
	var meld = new Meld(Rank.JOKER, [
		new Card(Rank.TWO, Suit.HEARTS),
		new Card(Rank.TWO, Suit.DIAMONDS),
		new Card(Rank.TWO, Suit.CLUBS),
		new Card(Rank.TWO, Suit.HEARTS),
		Card.RED_JOKER,
		Card.BLACK_JOKER,
		Card.RED_JOKER
	])
	expect(meld.validate()).toBe(true);
	expect(meld.isBook()).toBe(true);
	expect(meld.getBookKind()).toBe('WILD');

})


test('test points on basic meld', () => {
	var meld = new Meld(Rank.FIVE, [
		new Card(Rank.FIVE, Suit.HEARTS),
		new Card(Rank.FIVE, Suit.HEARTS),
		new Card(Rank.FIVE, Suit.HEARTS),
	])
	expect(meld.validate()).toBe(true);
	expect(meld.points()).toBe(15);
})

test.todo('test other melds for points')
test.todo('test books for points')