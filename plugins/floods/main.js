module.exports = function(bot) {
    var bot = bot;

    this.run = function(msg) {
        bot.sendMessage(msg.from.id, 'Я получил твое сообщение');
        return false;
    }

}