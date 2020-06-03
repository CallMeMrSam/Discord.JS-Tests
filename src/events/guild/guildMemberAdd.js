const { Client } = require('../../../modules/Bot');
const { GuildMember } = require('discord.js')

const Canvas = require('canvas');
const axios = require('axios');

module.exports = class {
    
    /**
     * 
     * @param {Client} client 
     * @param {GuildMember} member
     */
    async run(client, member) {

        function buffer(data) {
            return axios.get(data, {
                responseType: 'arraybuffer'
            })
            .then((res) => res.data)
            .catch(err => console.log(err));
        }
    
        function responsiveText(canvas, text) {
            const SizeCtx = canvas.getContext('2d');
            let fontSize = 20;
            do {
                SizeCtx.font = `bold ${fontSize -= 2}pt Calibri,Geneva,Arial,sans serif`;
            } while (SizeCtx.measureText(text).width > canvas.width - 15);
            return SizeCtx.font;
        }
        
        async function Welcome(data) {
            const canvas = Canvas.createCanvas(400, 200);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(await Canvas.loadImage('./src/img/bg.png'), 0, 0)
            ctx.strokeStyle='#ffffff';
            ctx.lineWidth="5";
            ctx.strokeRect(0, 0, 400, 200)
            ctx.fillStyle='#ffffff';
            ctx.font = responsiveText(canvas, `Welcome to ${data.tag}`);
            ctx.textAlign='center';
            ctx.fillText(`Bienvenue à ${data.tag}!`, 200, 184);
            ctx.beginPath();
            ctx.arc(195, 84, 68, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.fillStyle='#ffffff';
            ctx.fillRect(126, 15, 140, 140);
            ctx.beginPath();
            ctx.arc(195, 84, 64, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(await Canvas.loadImage(await buffer(data.displayAvatarURL({format: 'png'}))), 131, 20, 128, 128);
            return canvas.toBuffer();
        }
        
        member.guild.channels.cache.get('717848813838008454').send({
            files: [{
                attachment: await Welcome(member.user),
                name: "welcome.png"
            }]
        });
    }
}