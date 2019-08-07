const {Card, Rank, Suit, Color} = require('../app/models/card.js')

const AH1 = new Card(Rank.ACE, Suit.HEARTS);
const AH2 = new Card(Rank.ACE, Suit.HEARTS);
const AS = new Card(Rank.ACE, Suit.SPADES);
const TH = new Card(Rank.TWO, Suit.HEARTS);
const TS = new Card(Rank.TWO, Suit.SPADES);
const FS = new Card(Rank.FIVE, Suit.SPADES);
const RJ = Card.RED_JOKER;
const ThH = new Card(Rank.THREE, Suit.HEARTS);
const ThS = new Card(Rank.THREE, Suit.SPADES);
const SH = new Card(Rank.SEVEN, Suit.HEARTS);
const EH = new Card(Rank.EIGHT, Suit.HEARTS);
const TeH = new Card(Rank.TEN, Suit.HEARTS);
const QH = new Card(Rank.QUEEN, Suit.HEARTS);


describe('Card', () => {

	test('equals compares cards', () => {
		expect(AH1.equals(AH2)).toBeTruthy();
		expect(AH1.equals(AS)).toBeFalsy();
		expect(AH1.equals(TH)).toBeFalsy();
	})

	test('getRank returns rank', () => {
		expect(AH1.getRank().equals(Rank.ACE)).toBeTruthy();
	})

	test('getSuit return suit', () => {
		expect(AH1.getSuit().equals(Suit.HEARTS)).toBeTruthy();
	})

	test.each([[TH, true], [TS, true], [FS, false], [RJ, true]])(
		'test isWild', 
		(card, expected) => {
			expect(card.isWild()).toBe(expected);
		}
	)

	test.each([
			[TH, false], [RJ, false], [ThH, false],
			[ThS, false], [FS, true], [AH1, true]
		])(
		'test isNormalCard', 
		(card, expected) => {
			expect(card.isNormalCard()).toBe(expected);
		}
	)

	test.each([
			[FS, 5], [SH, 5], [EH, 10],
			[TeH, 10], [QH, 10], [AH1, 20],
			[TH, 20], [RJ, 50], [ThS, 50],
			[ThH, 100]
		])(
		'test points', 
		(card, expected) => {
			expect(card.points()).toBe(expected);
		}
	)

})

describe('Color', () => {
	test('equals should work', () => {
		expect(Color.RED.equals(Color.RED)).toBe(true);
		expect(Color.RED.equals(Color.BLACK)).toBe(false);
		expect(Color.BLACK.equals(Color.BLACK)).toBe(true);
		expect(Color.BLACK.equals(Color.RED)).toBe(false);
	})
})

describe('Suit', () => {
	test('suit equals should work', () => {
		expect(Suit.HEARTS.equals(Suit.HEARTS)).toBe(true);
		expect(Suit.HEARTS.equals(Suit.DIAMONDS)).toBe(false);
		expect(Suit.CLUBS.equals(Suit.SPADES)).toBe(false);
		expect(Suit.CLUBS.equals(Suit.CLUBS)).toBe(true);
	})

	test('getColor should return color', () => {
		expect(Suit.HEARTS.getColor().equals(Color.RED)).toBe(true);
		expect(Suit.DIAMONDS.getColor().equals(Color.RED)).toBe(true);
		expect(Suit.SPADES.getColor().equals(Color.BLACK)).toBe(true);
		expect(Suit.CLUBS.getColor().equals(Color.BLACK)).toBe(true);
	})

})

describe('Rank', () => {
	test('rank equals should work', () => {
		expect(Rank.ACE.equals(Rank.ACE)).toBe(true);
		expect(Rank.ACE.equals(Rank.TWO)).toBe(false);
		expect(Rank.THREE.equals(Rank.KING)).toBe(false);
		expect(Rank.THREE.equals(Rank.THREE)).toBe(true);
	})
})
