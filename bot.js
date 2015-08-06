var TelegamBot  = require('node-telegram-bot-api');

module.exports = function(config) {
    var initialized = false;
    var config      = config;
    var plugins     = [];
    var api         = null;

    this.run = function() {
        if (initialized === true) {
            return false;
        }

        // initialize app
        this.initialize();

        // messages handler
        api.on('message', function(msg) {
            for (name in plugins) {
                next = plugins[name].run(msg);
                if (next === false) return;
            }
        });
    }

    // initialize app method
    this.initialize = function() {
        if (initialized === true) {
            return false;
        }

        // initialize telegram bot api
        api = new TelegamBot(config.telegram.token, config.telegram.options);

        // initialize plugins
        for (name in config.plugins) {
            PluginClass = require('./plugins/' + config.plugins[name] + '/main.js');
            plugins[name] = new PluginClass(this);
        }

        initialized = true;

        console.log('Successfully initialized');
    }

    // api methods
    this.sendMessage = function(chat_id, text, options) {
        if (typeof(chat_id) === 'undefined') chat_id = false;
        if (typeof(text)    === 'undefined') text = false;
        if (typeof(options) === 'undefined') options = false;

        if (chat_id && text) {
            api.sendMessage(chat_id, text, options)
            return true;
        }

        return false;
    }
}