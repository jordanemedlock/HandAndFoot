var {StandardDeck, MultiDeck} = require('./models/deck.js')
var {simpleDeckRenderer} = require('./views/textRenderer.js')

var deck = new MultiDeck(2);
deck.initialize()
deck.shuffle()

console.log(simpleDeckRenderer.render(deck));