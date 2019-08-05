const {Table, Meld} = require('../app/models/table.js')
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

test('adding and getting meld from table', () => {
	var rank = Rank.FIVE;
	var cards = [
		new Card(Rank.FIVE, Suit.HEARTS), 
		new Card(Rank.FIVE, Suit.HEARTS),
		new Card(Rank.FIVE, Suit.HEARTS),
	];
	var meld = new Meld(rank, cards);
	var table = new Table();
	table.addMeld(rank, meld);
	expect(table.getMeld(rank).getRank().equals(rank)).toBe(true);
})