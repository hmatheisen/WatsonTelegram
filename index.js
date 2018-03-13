const TelegramBot = require('node-telegram-bot-api');
const Conversation = require('watson-developer-cloud/conversation/v1');
require('dotenv').config();

const token = process.env.TELEGRAM_TOKEN;
const workspace_id = process.env.CONVERSATION_WORKSPACE_ID;

const bot = new TelegramBot(token, {polling: true});

const conversation = new Conversation({
    username: process.env.CONVERSATION_USERNAME,
    password: process.env.CONVERSATION_PASSWORD,
    version_date: '2018-02-16'
});

bot.on('message', (msg) => {
    
    const chatId = msg.chat.id;

    const payload = {
        workspace_id: workspace_id,
        input: msg || {}
    }

    conversation.message(payload, (err, response) => {
        if (err) {
            console.log('error: ', err);
        } else {
            bot.sendMessage(chatId, response.output.text[0]);
        }
    });

});