const {Meld} = require('../app/models/meld.js')
const {Card, Rank, Suit} = require('../app/models/card.js')
const _ = require('lodash')

const AH1 = new Card(Rank.ACE, Suit.HEARTS);
const AH2 = new Card(Rank.ACE, Suit.HEARTS);
const AS = new Card(Rank.ACE, Suit.SPADES);
const TH = new Card(Rank.TWO, Suit.HEARTS);
const TS = new Card(Rank.TWO, Suit.SPADES);
const FH = new Card(Rank.FIVE, Suit.HEARTS);
const FD = new Card(Rank.FIVE, Suit.DIAMONDS);
const FS = new Card(Rank.FIVE, Suit.SPADES);
const FC = new Card(Rank.FIVE, Suit.CLUBS);
const RJ = Card.RED_JOKER;
const BJ = Card.BLACK_JOKER;
const ThH = new Card(Rank.THREE, Suit.HEARTS);
const ThS = new Card(Rank.THREE, Suit.SPADES);
const ThC = new Card(Rank.THREE, Suit.CLUBS);
const ThD = new Card(Rank.THREE, Suit.DIAMONDS);
const SH = new Card(Rank.SEVEN, Suit.HEARTS);
const EH = new Card(Rank.EIGHT, Suit.HEARTS);
const TeH = new Card(Rank.TEN, Suit.HEARTS);
const QH = new Card(Rank.QUEEN, Suit.HEARTS);

const melds = [
	[Rank.FIVE, [FH, FD, FS], 	true, 	15],
	[Rank.FIVE, [FH, FD, TS], 	true, 	30],
	[Rank.FIVE, [FH, FD], 			false, 	null],
	[Rank.FIVE, [FH, FD, SH], 	false,  null],

	[Rank.EIGHT, [EH, TS, RJ], 	false, 	null],
	[Rank.TWO, [TS, RJ, BJ], 		true,		120],
	[Rank.THREE, [ThH], 				true,		100],
	[Rank.THREE, [ThS, ThC, ThS], false, 	null],
	[Rank.THREE, [ThH, ThH, ThD], true, 	300],
	[Rank.THREE, [ThH, ThH, TS], 	false,	null],
	[Rank.FIVE, _.times(7, () => RJ), false, null],

	[Rank.FIVE, _.times(7, () => FH), true, 5*7 + 500],
	[Rank.FIVE, _.chain(5).times(() => FH).concat([RJ,BJ]).value(), true, 5*5 + 100 + 300],
	[Rank.TWO, _.times(7, () => RJ), true, 50*7 + 1000]
]

describe('Meld', () => {
	test.each(melds)(
		'validates or invalidates melds', 
		(rank, cards, expected, points) => {
			expect((new Meld(rank, cards)).validate()).toBe(expected);
		}
	)

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


	test.each(melds)(
		'test points', 
		(rank, cards, valid, points) => {
			var meld = new Meld(rank, cards);
			expect(meld.validate()).toBe(valid);
			expect(meld.points()).toBe(points);
		}
	)

	test('red threes count as base never count', () => {
		var meld = new Meld(Rank.THREE, [ThH, ThD]);
		expect(meld.validate()).toBe(true);
		expect(meld.base()).toBe(200);
		expect(meld.count()).toBe(0);
		expect(meld.points()).toBe(200);
	})

	test('copy returns a copy of the current meld', () => {
		var meld = new Meld(Rank.THREE, [ThH, ThD]);
		expect(meld.validate()).toBe(true);
		expect(meld.size()).toBe(2);
		var copied = meld.copy();
		expect(copied.size()).toBe(2);
		copied.addCard(new Card(Rank.THREE, Suit.HEARTS));
		expect(copied.size()).toBe(3);
		expect(meld.size()).toBe(2);
	})
})
