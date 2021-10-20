const Discord = require('discord.js');
const port = 3000;

exports.run = async (client, message, args) => {
    await message.channel.send(`http://localhost:${port}/help`);
} 