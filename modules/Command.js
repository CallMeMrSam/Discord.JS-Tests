const Client = require('./Client')

module.exports = class {

    /**
     * Commande
     * @param {Client} client 
     */
    constructor(client, 
        {
            name = null,
            aliases = new Array(),
            description = "Aucune description",
            usage = new Array(),
            
            guildOnly = false,
            permLevel = "User",
            enabled = true
        }) {
            this.client = client;
            this.info   = { name, aliases, description, usage, category: "unlisted" }
            this.config = { guildOnly, permLevel, enabled }
        }
}