var {Card, Rank, Suit, Color} = require('./card.js')
var {CardRenderer, RankRenderer, SuitRenderer} = require('./renderer.js')

var map = {};

map[Rank.TWO.value] = '2'
map[Rank.THREE.value] = '3'
map[Rank.FOUR.value] = '4'
map[Rank.FIVE.value] = '5'
map[Rank.SIX.value] = '6'
map[Rank.SEVEN.value] = '7'
map[Rank.EIGHT.value] = '8'
map[Rank.NINE.value] = '9'
map[Rank.TEN.value] = '10'
map[Rank.JACK.value] = 'Ja'
map[Rank.QUEEN.value] = 'Q'
map[Rank.KING.value] = 'K'
map[Rank.ACE.value] = 'A'
map[Rank.JOKER.value] = 'Jk'

exports.oneLetterRank = oneLetterRank = new RankRenderer(map)

exports.oneLetterSuit = oneLetterSuit = new SuitRenderer('H', 'D', 'C', 'S')

exports.simpleCardRenderer = simpleCardRenderer = new CardRenderer(oneLetterRank, oneLetterSuit, (r,s) => r+s)

exports.simpleDeckRenderer = simpleDeckRenderer = new DeckRenderer(simpleCardRenderer, ' ')