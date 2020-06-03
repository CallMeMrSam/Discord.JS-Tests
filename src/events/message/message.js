const { Client } = require('../../../modules/Bot');
const { Message } = require('discord.js');

const prefix = "!"

module.exports = class {
    /**
     * 
     * @param {Message} message
     * @param {Client} client 
     */
    async run(client, message) {
        
        if(message.author.bot) return;
        if(!message.channel.permissionsFor(message.guild.me).missing("SEND_MESSAGES")) return;
        
        if(message.content.indexOf(prefix) !== 0) return;

        const args = message.content.slice(prefix.length).trim().split(/\s+/g);
        const cmdName = args.shift().toLowerCase();

        if(message.guild && !message.member) await message.guild.fetchMember(message.author);
        
        const cmd = client.commands.get(cmdName) || client.commands.get(client.aliases.get(cmdName));
        if(!cmd) return;
        
        message.flags = [];
        while (args[0] && args[0][0] === "-") {
            message.flags.push(args.shift().slice(1));
        }
        
        cmd.run(message, args);
    }
}