const _ = require('lodash')
const {Table} = require('./table.js')

exports.PlayerInfo = PlayerInfo = class PlayerInfo {
	constructor(hand, foot) {
		this.hand = hand;
		this.foot = foot;
		this.inFoot = false;
		this.table = new Table();
	}

	isInFoot() {
		return this.inFoot;
	}

	getPublic() {
		return new PlayerInfo.Public(this.hand.length, this.isInFoot(), this.table.copy());
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

	doesHaveRedThrees() {
		return _.filter(this.hand, (c) => c.isRedThree()).length > 0;
	}

	moveRedThreesToTable() {
		var [redThrees, rest] = _.partition(this.hand, (c) => c.isRedThree());
		this.getTable().addRedThrees(redThrees);
		this.hand = rest;
	}

	copy() {
		var ret = new PlayerInfo(_.map(this.getHand(), (x) => x), _.map(this.getFoot(), (x) => x));
		ret.table = this.getTable().copy();
		ret.inFoot = this.isInFoot();
		return ret;
	}

	canPickupPile(pile) {
		var card = pile.topCard();
		var rank = card.getRank();
		var frozen = pile.isFrozen();
		var numInHand = this.getCardsInHandWithRank(rank).length;
		var melds = this.getTable().getMelds(rank);

		if (card.isNormalCard()) {
			if (frozen) {
				return numInHand >= 2;
			} else {
				if (melds.length > 0) {
					return true;
				} else {
					return numInHand >= 2;
				}
			}
		} else {
			return false;
		}
	}

	getCardsInHandWithRank(rank) {
		return _.filter(this.hand, (c) => c.getRank().equals(rank));
	}

}

PlayerInfo.Public = class Public {
	constructor(numInHand, inFoot, table) {
		this.numInHand = numInHand;
		this.inFoot = inFoot;
		this.table = table;
	}
}

exports.Player = Player = class Player {
	constructor(name) {
		this.name = name;
	}

	getName() {
		return this.name;
	}

	pickOption(options, playerInfo, gameInfo) {

	}
}


