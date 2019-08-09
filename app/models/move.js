const _ = require('lodash')

exports.Options = Options = class Options {
	constructor(options) {
		this.options = options
	}
}

exports.Move = Move = class Move {}

exports.AddToTable = AddToTable = class AddToTable extends Move {
	addCards(cards) {
		this.cards = cards;
	}
}

exports.Discard = Discard = class Discard extends Move {
	addCard(card) {
		this.card = card;
	}
}

exports.GetIntoFoot = GetIntoFoot = class GetIntoFoot extends Move {
	withDiscard(card) {
		this.card = card;
	}
}

exports.GoOut = GoOut = class GoOut extends Move {
	withDiscard(card) {
		this.card = card;
	}
}

exports.PickUpPile = PickUpPile = class PickUpPile extends Move {}

exports.DrawTwo = DrawTwo = class DrawTwo extends Move {}
