const { Command, Client } = require('../../../modules/Bot');
const { Message, MessageEmbed } = require('discord.js');

const Canvas = require('canvas');
const axios = require('axios');

module.exports = class extends Command {
    
    /**
     * Command
     * @param {Client} client 
     */
    constructor(client) {
        super(client, {
            name: "stats",
            aliases: [],
            description: "Commande de statistiques",
            usage: []
        });
    }

    /**
     * Exécuter la commande
     * @param {Message} message 
     * @param {String[]} args 
     */
    async run(message, args) {
        
        function buffer(data) {
            return axios.get(data, {
                responseType: 'arraybuffer'
            })
            .then((res) => res.data)
            .catch(err => console.log(err));
        }
    
        function responsiveText(canvas, text, maxWidth) {
            const SizeCtx = canvas.getContext('2d');
            let fontSize = 25;
            do {
                SizeCtx.font = `bold ${fontSize -= 2}pt Calibri,Geneva,Arial,sans serif`;
            } while (SizeCtx.measureText(text).width > maxWidth);
            return SizeCtx.font;
        }

        async function Stats(data) {
            
            const canvas = Canvas.createCanvas(400, 500);
            const ctx = canvas.getContext('2d');

            ctx.fillStyle="#41af54";
            ctx.fillRect(0, 0, 400, 500);

            ctx.strokeStyle='#ffffff';
            ctx.lineWidth="10";
            ctx.strokeRect(0, 0, 400, 500);

            ctx.fillStyle='#ffffff';

            ctx.font = responsiveText(canvas, `${data.user.tag}`, canvas.width - 15);
            ctx.textAlign='center';
            ctx.fillText(`${data.user.tag}`, 200, 35);

            ctx.font = responsiveText(canvas, `Développeur: ${data.users.cache.get('239654425424035840').tag}`, canvas.width - 15);
            ctx.textAlign='center';
            ctx.fillText(`Développeur: ${data.users.cache.get('239654425424035840').tag}`, 200, 100);
            
            ctx.font = responsiveText(canvas, `Serveurs: ${data.guilds.cache.size}`, canvas.width - 15);
            ctx.textAlign='center';
            ctx.fillText(`Serveurs: ${data.guilds.cache.size}`, 200, 200);

            ctx.font = responsiveText(canvas, `Utilisateurs: ${data.users.cache.size}`, canvas.width - 15);
            ctx.textAlign='center';
            ctx.fillText(`Utilisateurs: ${data.users.cache.size}`, 200, 300);

            ctx.font = responsiveText(canvas, `Salons: ${data.guilds.cache.size}`, canvas.width - 15);
            ctx.textAlign='center';
            ctx.fillText(`Salons: ${data.guilds.cache.size}`, 200, 400);

            return canvas.toBuffer();
        }

        message.channel.send({
            files: [{
                attachment: await Stats(this.client),
                name: "stats.png"
            }]
        });
    }
}