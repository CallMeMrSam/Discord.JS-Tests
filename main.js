require('dotenv').config();
const { sep } = require('path');

const { Client } = require('./modules/Bot')

const client = new Client();

client.loadCommands(`${__dirname}${sep}src${sep}commands`);
client.loadEvents(`${__dirname}${sep}src${sep}events`);

client.login(process.env.TOKEN)