exports.Card = Card = class Card {
	constructor(rank, suit) {
		this.rank = rank;
		this.suit = suit;
	}

	getRank() {
		return this.rank;
	}

	getSuit() {
		return this.suit;
	}

	equals(other) {
		return this.rank.equals(other.rank) && this.suit.equals(other.suit);
	}
}

exports.Rank = Rank = class Rank {
	constructor(value) {
		this.value = value
	}

	equals(rank) {
		return rank.value == this.value;
	}

}

exports.Suit = Suit = class Suit {
	constructor(value) {
		this.value = value;
	}

	equals(suit) {
		return suit.value == this.value;
	}

	getColor() {
		switch(this) {
			case HEARTS:
			case DIAMONDS:
				return RED;
			case CLUBS:
			case SPADES:
				return BLACK;
		}
	}
}

exports.Color = Color = class Color {
	constructor(value) {
		this.value = value;
	}

	equals(color) {
		return color.value == this.value;
	}
}



exports.Rank.TWO = TWO = new Rank('TWO')
exports.Rank.THREE = THREE = new Rank('THREE')
exports.Rank.FOUR = FOUR = new Rank('FOUR')
exports.Rank.FIVE = FIVE = new Rank('FIVE')
exports.Rank.SIX = SIX = new Rank('SIX')
exports.Rank.SEVEN = SEVEN = new Rank('SEVEN')
exports.Rank.EIGHT = EIGHT = new Rank('EIGHT')
exports.Rank.NINE = NINE = new Rank('NINE')
exports.Rank.TEN = TEN = new Rank('TEN')
exports.Rank.JACK = JACK = new Rank('JACK')
exports.Rank.QUEEN = QUEEN = new Rank('QUEEN')
exports.Rank.KING = KING = new Rank('KING')
exports.Rank.ACE = ACE = new Rank('ACE')
exports.Rank.JOKER = JOKER = new Rank('JOKER')

exports.Rank.ALL = [TWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,NINE,TEN,JACK,QUEEN,KING,ACE,JOKER];

exports.Suit.HEARTS = HEARTS = new Suit('HEARTS')
exports.Suit.DIAMONDS = DIAMONDS = new Suit('DIAMONDS')
exports.Suit.CLUBS = CLUBS = new Suit('CLUBS')
exports.Suit.SPADES = SPADES = new Suit('SPADES')

exports.Suit.ALL = SUITS = [HEARTS, DIAMONDS, CLUBS, SPADES];

exports.Color.BLACK = BLACK = new Color('BLACK')
exports.Color.RED = RED = new Color('RED')

exports.COLORS = COLORS = [RED,BLACK];

exports.Card.RED_JOKER = RED_JOKER = new Card(Rank.JOKER, Suit.HEARTS)
exports.Card.BLACK_JOKER = BLACK_JOKER = new Card(Rank.JOKER, Suit.CLUBS)

