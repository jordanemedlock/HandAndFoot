const _ = require('lodash')

exports.Table = Table = class Table {
	constructor() {
		this.melds = []
	}

	getMelds() {
		return this.melds;
	}

	getMeldsWithRank(rank) {
		return _.filter(this.melds, (m) => m.getRank().equals(rank));
	} 

	addMeld(meld) {
		this.melds.push(meld);
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

	addRedThrees(cards) {
		var meld = this.getRedThrees();
		if (meld) {
			meld.addCards(cards);
		} else {
			this.addMeld(new Meld(Rank.THREE, cards));	
		}
	}

	getRedThrees() {
		var melds = _.filter(this.melds, (m) => m.getRank().equals(Rank.THREE));
		if (melds.length == 1) {
			return melds[0];
		} else {
			return null;
		}
	}
}
