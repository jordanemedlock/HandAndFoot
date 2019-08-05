const _ = require('lodash')
const {Table} = require('./table.js')

exports.Player = Player = class Player {
	constructor(hand, foot) {
		this.hand = hand;
		this.foot = foot;
		this.inFoot = false;
		this.table = new Table();
	}

	makeMove(pile, deck, otherPlayers) {
		return null;
	}

	isInFoot() {
		return this.inFoot;
	}

	getPublic() {
		return new this.Player(this.hand.length, this.isInFoot(), this.table.copy());
	}

}

Player.Public = class Public {
	constructor(numInHand, inFoot, table) {
		this.numInHand = numInHand;
		this.inFoot = inFoot;
		this.table = table;
	}
}

