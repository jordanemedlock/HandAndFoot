const _ = require('lodash')

exports.Table = Table = class Table {
	constructor() {
		this.meld = {};
	}

	getMeld(rank) {
		return this.meld[rank.value];
	}

	addMeld(rank, set) {
		this.meld[rank.value] = set;
	}

}
