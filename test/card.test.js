const {Card, Rank, Suit, Color} = require('../app/models/card.js')

test('equivalent cards should equal eachother and oposite', () => {
	var card1 = new Card(Rank.ACE, Suit.HEARTS);
	var card2 = new Card(Rank.ACE, Suit.HEARTS);
	expect(card1.equals(card2)).toBe(true);
	var card3 = new Card(Rank.ACE, Suit.SPADES);
	expect(card1.equals(card3)).toBe(false);
	var card4 = new Card(Rank.TWO, Suit.HEARTS);
	expect(card1.equals(card4)).toBe(false);
})

test('test getRank and getSuit', () => {
	var card = new Card(Rank.JACK, Suit.DIAMONDS);
	expect(card.getRank().equals(Rank.JACK)).toBe(true);
	expect(card.getSuit().equals(Suit.DIAMONDS)).toBe(true);
})

test('color equals should work', () => {
	expect(Color.RED.equals(Color.RED)).toBe(true);
	expect(Color.RED.equals(Color.BLACK)).toBe(false);
	expect(Color.BLACK.equals(Color.BLACK)).toBe(true);
	expect(Color.BLACK.equals(Color.RED)).toBe(false);
})

test('suit equals should work', () => {
	expect(Suit.HEARTS.equals(Suit.HEARTS)).toBe(true);
	expect(Suit.HEARTS.equals(Suit.DIAMONDS)).toBe(false);
	expect(Suit.CLUBS.equals(Suit.SPADES)).toBe(false);
	expect(Suit.CLUBS.equals(Suit.CLUBS)).toBe(true);
})

test('rank equals should work', () => {
	expect(Rank.ACE.equals(Rank.ACE)).toBe(true);
	expect(Rank.ACE.equals(Rank.TWO)).toBe(false);
	expect(Rank.THREE.equals(Rank.KING)).toBe(false);
	expect(Rank.THREE.equals(Rank.THREE)).toBe(true);
})

test('test getColor', () => {
	expect(Suit.HEARTS.getColor().equals(Color.RED)).toBe(true);
	expect(Suit.DIAMONDS.getColor().equals(Color.RED)).toBe(true);
	expect(Suit.SPADES.getColor().equals(Color.BLACK)).toBe(true);
	expect(Suit.CLUBS.getColor().equals(Color.BLACK)).toBe(true);
})