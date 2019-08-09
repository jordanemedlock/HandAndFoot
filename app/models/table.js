const _ = require('lodash')

exports.Table = Table = class Table {
	constructor() {
		this.melds = {};
	}

	getMeld(rank) {
		return this.melds[rank.value];
	}

	addMeld(meld) {
		this.melds[meld.getRank().value] = meld;
	}

	base() {
		return _.chain(this.melds)
						.map((m) => m.base())
						.sum()
						.value();
	}

	count() {
		return _.chain(this.melds)
						.map((m) => m.count())
						.sum()
						.value();
	}

	points() {
		return this.base() + this.count();
	}

	books() {
		return _.filter(this.melds, (m) => m.isBook())
	}

	pureBooks() {
		return _.filter(this.books(), (m) => m.getBookKind() == 'PURE');
	}
	dirtyBooks() {
		return _.filter(this.books(), (m) => m.getBookKind() == 'DIRTY');
	}
	wildBooks() {
		return _.filter(this.books(), (m) => m.getBookKind() == 'WILD');
	}

	canGoOut() {
		return this.pureBooks().length >= 1 && 
					 this.dirtyBooks().length >= 1 && 
					 this.wildBooks().length >= 1;
	}


	copy() {
		var newTable = new Table();
		_.each(this.melds, (m) => newTable.addMeld(m.copy()));
		return newTable;
	}

	size() {
		return _.size(this.melds);
	}
}
