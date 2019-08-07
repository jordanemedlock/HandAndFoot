const {Table} = require('../app/models/table.js')
const {Meld} = require('../app/models/meld.js')
const {Card, Rank, Suit} = require('../app/models/card.js')

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

