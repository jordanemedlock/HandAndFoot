const _ = require('lodash')
const {Table} = require('./table.js')

exports.Player = Player = class Player {
	constructor() {
	}

	initialize(hand, foot) {
		this.hand = hand;
		this.foot = foot;
		this.table = new Table();
		this.inFoot = false;
	}

	makeMove(pile, deck, otherPlayers) {
	}

	isInFoot() {
		return this.inFoot;
	}

	getPublic() {
		return new Player.Public(this.hand.length, this.isInFoot(), this.table.copy());
	}

	getHand() {
		return this.hand;
	}

	getFoot() {
		return this.foot;
	}

	getTable() {
		return this.table;
	}

}

Player.Public = class Public {
	constructor(numInHand, inFoot, table) {
		this.numInHand = numInHand;
		this.inFoot = inFoot;
		this.table = table;
	}
}

