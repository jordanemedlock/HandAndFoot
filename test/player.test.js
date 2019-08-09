const {PlayerInfo} = require('../app/models/player.js')
const {MultiDeck, StandardDeck} = require('../app/models/deck.js')
const {Meld} = require('../app/models/meld.js')
const {getCards} = require('./util.js')
const {Rank} = require('../app/models/card.js')
const _ = require('lodash')

var playerInfo;
describe('PlayerInfo', () => {
	beforeEach(() => {
		var deck = new MultiDeck(3, () => new StandardDeck(true));
		deck.initialize();
		var hand = deck.draw(13);
		var foot = deck.draw(13);
		playerInfo = new PlayerInfo(hand, foot);
	})

	test('playerInfo has hand, foot, table, after initialized', () => {
		expect(playerInfo.getHand()).toBeTruthy();
		expect(playerInfo.getFoot()).toBeTruthy();
		expect(playerInfo.getTable()).toBeTruthy();
	})

	test('getPublic returns a public version of the players data', () => {
		playerInfo.getTable().addMeld(new Meld(Rank.FIVE, getCards('5H', '5D', '5S')));
		var publicInfo = playerInfo.getPublic();

		expect(publicInfo.inFoot).toBe(false);
		expect(publicInfo.numInHand).toBe(13);
		expect(publicInfo.hand).toBeFalsy();
		expect(publicInfo.foot).toBeFalsy();
		expect(publicInfo.table).toBeTruthy();
		expect(publicInfo.table.size()).toBe(1);
		publicInfo.table.addMeld(new Meld(Rank.TEN, getCards('10H', '10S', '10S')))

		expect(playerInfo.getTable().size()).toBe(1);

	})

	test('copy returns a copy of the player info', () => {
		playerInfo.getTable().addMeld(new Meld(Rank.FIVE, getCards('5H', '5D', '5S')));
		var copied = playerInfo.copy();

		copied.getHand().push(getCards('3H'));
		copied.getFoot().pop();
		expect(_.size(copied.getHand())).toBe(14);
		expect(_.size(copied.getFoot())).toBe(12);
		expect(_.size(playerInfo.getHand())).toBe(13);
		expect(_.size(playerInfo.getFoot())).toBe(13);
	})
})
