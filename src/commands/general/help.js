const { Command, Client } = require('../../../modules/Bot');
const { Message, MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    
    /**
     * Command
     * @param {Client} client 
     */
    constructor(client) {
        super(client, {
            name: "help",
            aliases: ["h"],
            description: "Commande d'aide",
            usage: ["help", "help <commande>"]
        });
    }

    /**
     * Exécuter la commande
     * @param {Message} message 
     * @param {String[]} args 
     */
    run(message, args) {
        var commands = {};

        this.client.commands.forEach(cmd => {
            if(!commands[cmd.info.category]) {
                commands[cmd.info.category] = [];
            }
            commands[cmd.info.category].push(cmd.info);
        });

        console.log(commands)
    }
}