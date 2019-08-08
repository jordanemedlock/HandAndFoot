const _ = require('lodash')
const {Table} = require('../app/models/table.js')
const {Meld} = require('../app/models/meld.js')
const {Card, Rank, Suit} = require('../app/models/card.js')
const {getCards, getPureMeld, getDirtyMeld} = require('./util.js')

var table = new Table();
table.addMeld(new Meld(Rank.THREE, getCards('3H', '3D')))
table.addMeld(getPureMeld(Rank.TWO, 7))
table.addMeld(getPureMeld(Rank.FIVE, 7))
table.addMeld(getDirtyMeld(Rank.TEN, 5, 2))
table.addMeld(getPureMeld(Rank.ACE, 5))
table.addMeld(getPureMeld(Rank.EIGHT, 4))

describe('Table', () => {

	test('adding and getting meld from table', () => {
		var rank = Rank.FIVE;
		var cards = getCards('5H', '5H', '5H');
		var meld = new Meld(rank, cards);
		var table = new Table();
		table.addMeld(meld);
		expect(table.getMeld(rank).getRank().equals(rank)).toBe(true);
	})

	test.each([
			[
				[
					new Meld(Rank.THREE, getCards('3H', '3D')),
					getPureMeld(Rank.FIVE, 7),
					getDirtyMeld(Rank.TEN, 5, 2)
				],
				1000,
				5*7+10*5+2*20
			],
			[
				[
					new Meld(Rank.THREE, getCards('3H', '3D')),
					getPureMeld(Rank.FIVE, 7),
					getDirtyMeld(Rank.TEN, 5, 2),
					getPureMeld(Rank.ACE, 5),
					getPureMeld(Rank.EIGHT, 4)
				],
				1000,
				5*7+10*5+2*20+5*20+4*10
			]
		])(
		'base will return the base value for all the melds', 
		(melds, base, count) => {
			var table = new Table();
			var allValid = _.every(melds, (m) => {
				var ret = m.validate();
				table.addMeld(m);
				return ret;
			});
			expect(allValid).toBe(true);
			expect(table.base()).toBe(base);
			expect(table.count()).toBe(count);
			expect(table.points()).toBe(base + count);
		}
	)

	test('books returns a list of the melds that are books', () => {
		var books = table.books();
		expect(books.length).toBe(3);
		expect(_.filter(books, (meld) => meld.getRank().equals(Rank.FIVE)).length).toBe(1);
		expect(_.filter(books, (meld) => meld.getRank().equals(Rank.TEN)).length).toBe(1);
		expect(_.filter(books, (meld) => meld.getRank().equals(Rank.TWO)).length).toBe(1);
	})


	test('pureBooks returns a list of the books that are pure', () => {
		var books = table.pureBooks();
		expect(books.length).toBe(1);
		expect(_.filter(books, (meld) => meld.getRank().equals(Rank.FIVE)).length).toBe(1);
	})



	test('wildBooks returns a list of the books that are wild', () => {
		var books = table.wildBooks();
		expect(books.length).toBe(1);
		expect(_.filter(books, (meld) => meld.getRank().equals(Rank.TWO)).length).toBe(1);
	})

	test('dirtyBooks returns a list of the books that are dirty', () => {
		var books = table.dirtyBooks();
		expect(books.length).toBe(1);
		expect(_.filter(books, (meld) => meld.getRank().equals(Rank.TEN)).length).toBe(1);
	})

	test('canGoOut returns true if you have a wild, pure and dirty books', () => {
		expect(table.canGoOut()).toBe(true);
		expect(new Table().canGoOut()).toBe(false);
	})

})
