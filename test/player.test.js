const {Player} = require('../app/models/player.js')
const {MultiDeck, StandardDeck} = require('../app/models/deck.js')
const {Meld} = require('../app/models/meld.js')
const {getCards} = require('./util.js')
const {Rank} = require('../app/models/card.js')

var player;
describe('Player', () => {
	beforeEach(() => {
		player = new Player();
		var deck = new MultiDeck(3, () => new StandardDeck(true));
		deck.initialize();
		var hand = deck.draw(13);
		var foot = deck.draw(13);
		player.initialize(hand, foot);
	})

	test('player has hand, foot, table, after initialized', () => {
		expect(player.getHand()).toBeTruthy();
		expect(player.getFoot()).toBeTruthy();
		expect(player.getTable()).toBeTruthy();
	})

	test('getPublic returns a public version of the players data', () => {
		player.getTable().addMeld(new Meld(Rank.FIVE, getCards('5H', '5D', '5S')));
		var publicInfo = player.getPublic();

		expect(publicInfo.inFoot).toBe(false);
		expect(publicInfo.numInHand).toBe(13);
		expect(publicInfo.hand).toBeFalsy();
		expect(publicInfo.foot).toBeFalsy();
		expect(publicInfo.table).toBeTruthy();
		expect(publicInfo.table.size()).toBe(1);
		publicInfo.table.addMeld(new Meld(Rank.TEN, getCards('10H', '10S', '10S')))

		expect(player.getTable().size()).toBe(1);

	})
})
