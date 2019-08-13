const {Game} = require('../app/models/game.js')
const {Player} = require('../app/models/player.js')
const {Meld} = require('../app/models/meld.js')

describe('Game', () => {
	var game;
	beforeEach(() => {
		var player1 = new Player('Jordan');
		var player2 = new Player('AI');
		game = new Game([player1, player2]);
	})

	test('test constructor', () => {
		expect(game.players.length).toBe(2);
		expect(game.players[0].player.getName()).toBe('Jordan')
		expect(game.players[1].player.getName()).toBe('AI')
	})

	test('test createDeckAndPile', () => {
		game.createDeckAndPile();
		expect(game.deck.size()).toBe(54*3);
		expect(game.pile.size()).toBe(0);
	})


	test('test handOutCards', () => {
		game.createDeckAndPile();
		game.handOutCards();
		expect(game.deck.size()).toBe(54*3-13*4);
		expect(game.players[0].getPlayerInfo().hand.length).toBe(13);
		expect(game.players[0].getPlayerInfo().foot.length).toBe(13);
		expect(game.players[1].getPlayerInfo().hand.length).toBe(13);
		expect(game.players[1].getPlayerInfo().foot.length).toBe(13);
	})

	test('test flipCard', () => {
		game.createDeckAndPile();
		game.handOutCards();
		game.flipCard();
		expect(game.deck.size()).toBe(54*3-13*4-1);
		expect(game.pile.size()).toBe(1);
	})

	test('test drawStage', () => {
		game.createDeckAndPile();
		game.handOutCards();
		game.flipCard();

		game.currentPlayerNumber = 0;

		game.drawStage();
	});

	test('test getDrawTwoOption', () => {
		expect(game.getDrawTwoOption()).toBeTruthy();
		expect(game.getDrawTwoOption() instanceof DrawTwo).toBeTruthy();
	})

})