var Bot     = require('./bot.js');
var config  = require('./config.json');

var bot = new Bot(config);
bot.run();