const _ = require('lodash')
const {MultiDeck, StandardDeck} = require('./deck.js')
const {DrawTwo, PickUpPile} = require('./move.js')

exports.Game = Game = class Game {
	constructor(players) {
		this.players = _.chain(players)
										.map((p) => new IPlayer(p))
										.value();
	}

	start() {
		this.createDeckAndPile();
		this.handOutCards();	
		this.flipCard();

		this.currentPlayerNumber = 0;

		do {
			this.drawStage();
			var hasGoneOut = this.actionStage();
		} while(!hasGoneOut && this.deck.size() != 0);

		console.log(hasGoneOut + 'has gone out')
	}

	createDeckAndPile() {
		this.deck = new MultiDeck(this.players.length+1, () => new StandardDeck(true));
		this.deck.initialize();
		this.deck.shuffle();
		this.pile = new Pile();
	}

	handOutCards() {
		_.each(this.players, (player) => {
			var hand = this.deck.draw(13);
			var foot = this.deck.draw(13);
			var playerInfo = new PlayerInfo(hand, foot);
			player.setPlayerInfo(playerInfo);
		})
	}

	flipCard() {
		var topCard = this.deck.draw(1)[0];
		this.pile.discard(topCard);
		while (this.pile.topCard().isWild()) {
			this.pile.discard(this.deck.draw(1)[0]);
		} 
	}

	getCurrentPlayer() {
		return this.players[this.currentPlayerNumber];
	}

	nextPlayer() {
		this.currentPlayerNumber = this.currentPlayerNumber + 1 % this.players.length;
	}

	drawStage() {
		var iPlayer = this.getCurrentPlayer();
		var player = iPlayer.getPlayer();
		var playerInfo = iPlayer.getPlayerInfo();
		if (playerInfo.doesHaveRedThrees()) {
			playerInfo.moveRedThreesToTable();
		}


		var drawTwo = this.getDrawTwoOption();
		var options = [drawTwo];
		if (playerInfo.canPickupPile(this.pile)) {
			options.push(this.getPickupOption());
		}
		var gameInfo = this.getGameInfo();

		var response = player.pickOption(options, playerInfo, gameInfo);

		if (response instanceof DrawTwo) {
			var [redThrees, others] = this.drawTwoish();
			playerInfo.addRedThrees(redThrees);
			playerInfo.addToHand(others);
		} else if (response instanceof PickUpPile) {
			var cards = this.pile.pickUp();
			playerInfo.addToHand(cards);
		}
	}

	drawTwoish() {
		var draw = this.deck.draw(2);
		var [allRedThrees,allOthers] = [[],[]];
		var [redThrees,others] = _.partition(draw, (c) => c.isRedThree());
		allRedThrees.push(redThrees);
		allOthers.push(others);	
		while (redThrees.length > 0) {
			draw = this.deck.draw(redThrees.length);
			var [redThrees, others] = _.partition(draw, (c) => c.isRedThree());
			allRedThrees.push(redThrees);
			allOthers.push()
		}
		return [allRedThrees, allOthers];
	}


	getDrawTwoOption() {
		return new DrawTwo();
	}

	getPickupOption() {
		return new PickUpPile();
	}

	getPublicInfos() {
		return _.map(this.players, (p) => p.getPlayerInfo().getPublic());
	}


	getGameInfo() {
		var pileSize = this.pile.size();
		var topCard = this.pile.topCard();
		var deckSize = this.deck.size();
		var publicInfos = this.getPublicInfos();
		var gameInfo = new GameInfo(pileSize, topCard, deckSize, publicInfos);
		return gameInfo;
	}
	
}

class IPlayer {
	constructor(player) {
		this.player = player;
	}

	getPlayer() {
		return this.player;
	}

	setPlayerInfo(playerInfo) {
		this.playerInfo = playerInfo;
	}

	getPlayerInfo() {
		return this.playerInfo;
	}
}

class GameInfo {
	constructor(pileSize, topCard, deckSize, publicInfos) {
		this.pileSize = pileSize;
		this.topCard = topCard;
		this.deckSize = deckSize;
		this.publicInfos = publicInfos;
	}

	getPileSize() {
		return this.pileSize;
	}

	getTopCard() {
		return this.topCard;
	}

	getDeckSize() {
		return this.deckSize;
	}

	getPublicInfos() {
		return this.publicInfos;
	}
}