const { Client } = require('../../../modules/Bot');

module.exports = class {
    
    /**
     * 
     * @param {Client} client 
     */
    async run(client) {
        await client.wait(1000);
        client.ready = true;
        client.logger.updateLogChannel(client.channels.cache.get('715230976103546910'));

        client.appInfo = await client.fetchApplication();
        setInterval(async () => {
            client.appInfo = await client.fetchApplication();
        }, 60000)

        client.user.setActivity(`${client.commands.size} commandes.`)

        client.logger.success(`${client.user.tag} est prêt.`)
    }
}