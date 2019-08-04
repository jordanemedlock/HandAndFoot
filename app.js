var {StandardDeck, MultiDeck} = require('./deck.js')
var {simpleDeckRenderer} = require('./textRenderer.js')

var deck = new MultiDeck(2);
deck.initialize()
deck.shuffle()

console.log(simpleDeckRenderer.render(deck));