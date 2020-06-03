const { Command, Client } = require('../../../modules/Bot');
const { Message, MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    
    /**
     * Command
     * @param {Client} client 
     */
    constructor(client) {
        super(client, {
            name: "eval",
            aliases: [],
            description: "Commande pour exécuter du code javascript.",
            usage: []
        });
    }

    /**
     * Exécuter la commande
     * @param {Message} message 
     * @param {String[]} args 
     */
    run(message, args) {
        try{
            const code = args.join(" ");
            let evaled = eval(code);
       
            if(typeof evaled !== "string") evaled = require("util").inspect(evaled);

            message.channel.send(new MessageEmbed()
                .setColor('#4cdb45')
                .setTitle('Réussis!')
                .addField('Entrée:', `\`\`\`js\n${code}\`\`\``)
                .addField('Sortie:', `\`\`\`xl\n${clean(evaled)}\`\`\``))
            
        } catch(err){
            message.channel.send(new MessageEmbed()
                .setColor('#db4545')
                .setTitle('Echec!')
                .addField('Entrée:', `\`\`\`js\n${args.join(" ")}\`\`\``)
                .addField('Sortie:', `\`\`\`xl\n${clean(err)}\`\`\``))
        }
    }
}

const clean = (text) => {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}