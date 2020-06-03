const { readdirSync } = require('fs');
const { promisify } = require('util')
const { sep } = require('path');
const { Client, Collection } = require('discord.js');

module.exports = class extends Client {

    /**
     * Client
     */
    constructor() {
        super();

        this.debug = true;

        this.ready = false;

        this.wait = promisify(setTimeout);

        this.logger = new (require('./Logger'))(this);

        this.config = require('../config');

        this.commands = new Collection();
        this.aliases = new Collection();
        this.events   = new Collection();
    }

    /**
     * Charger les commandes
     * @param {String} path Chemin d'accès au dossier des commandes
     */
    loadCommands(path) {
        console.log(path)
        readdirSync(path).forEach(dir => {

            const commands = readdirSync(`${path}${sep}${dir}${sep}`).filter(f => f.endsWith('.js'));
            
            for (const file of commands) {
                try {
                    const cmd = new (require(`${path}${sep}${dir}${sep}${file}`))(this);

                    if(cmd.init) {
                        cmd.init(this);
                    }
                    
                    cmd.info.category = dir;
                    this.commands.set(cmd.info.name, cmd);
                    cmd.info.aliases.forEach(a => this.aliases.set(a, cmd.info.name));
                    
                    this.logger.success(`La commande ${cmd.info.name} a été chargée avec succès.`);
                }
                catch(e) {
                    this.logger.warning(`Impossible de charger le fichier ${path}${sep}${dir}${sep}${file}.`, e)
                }
            }
        });
    }

    /**
     * Charger les événements
     * @param {String} path Chemin d'accès au dossier des événements
     */
    loadEvents(path) {
        readdirSync(path).forEach(dir => {
            const events = readdirSync(`${path}/${dir}`).filter(f => f.endsWith('.js'));

            for (const file of events) {
                try {
                    const name = file.split('.')[0];
                    const evt = new (require(`${path}/${dir}/${file}`))();

                    this.on(name, evt.run.bind(null, this));

                    this.logger.success(`L'événement ${name} a été chargé`)
                }
                catch(e) {
                    this.logger.warning(`Impossible de charger le fichier ${path}/${dir}/${file}`, e)
                }
            }
        })
    }
}