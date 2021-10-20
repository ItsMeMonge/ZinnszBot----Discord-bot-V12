// =========================================================================================================

const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.get('/', (req, res) => {
    res.send(`Hello World`);
})

app.get('/help', (req, res) => {
    res.sendFile(path.join(__dirname + '/web/html/index.html'));
});


//=======================================================================================================

const Discord = require('discord.js');
const fs = require('fs');
const { Client, Intents } = require('discord.js');
const { userInfo } = require('os');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// ================================ Discord Config =====================================================

require('dotenv').config();
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

// ================================ Outros =============================================================

client.on('ready', () => {
    client.user.setActivity(
        `Animes`,
        { type: "WATCHING" })
});

// ================================ Bot Status =========================================================

client.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.toLowerCase().startsWith(process.env.PREFIX.toLowerCase())) return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

   const args = message.content
       .trim().slice(process.env.PREFIX.length)
       .split(/ +/g);
   const command = args.shift().toLowerCase();

   try {
       const commandFile = require(`./commands/${command}.js`)
       commandFile.run(client, message, args);
   } catch (err) {
   console.error('Erro:' + err);
 }
});

// =========================================================================================

client.login(token);
console.log(`O bot foi iniciado!`);

app.listen(port, () => {
    console.log(`o servidor esta aberto: http://localhost:${port}`)
})
// ========================================================================================