const symbols = require('log-symbols');
const moment = require('moment');

const Client = require('./Client');

module.exports = class {
    /**
     * Logger
     * @param {Client} client 
     */
    constructor(client) {
        this.client = client;
        this.logChannel = undefined;
    }

    success(content, debug) {
        console.log(`${this.getMoment()} [${symbols.success}] ${content}${this.client.debug && debug ? debug : ''}`);
        this.logInChan(`${this.getMoment()} ✅ ${content}${this.client.debug && debug ? ' ' + debug : ''}`);
    }

    error(content, debug) {
        console.log(`${this.getMoment()} [${symbols.error}] ${content}${this.client.debug && debug ? debug : ''}`);
        this.logInChan(`${this.getMoment()} ❎ ${content}${this.client.debug && debug ? ' ' + debug : ''}`);
    }

    warning(content, debug) {
        console.log(`${this.getMoment()} [${symbols.warning}] ${content}${this.client.debug && debug ? debug : ''}`);
        this.logInChan(`${this.getMoment()} ⚠ ${content}${this.client.debug && debug ? ' ' + debug : ''}`);
    }

    info(content, debug) {
        console.log(`${this.getMoment()} [${symbols.info}] ${content}${this.client.debug && debug ? debug : ''}`);
        this.logInChan(`${this.getMoment()} ℹ ${content}${this.client.debug && debug ? ' ' + debug : ''}`);
    }

    getMoment() {
        return `[${moment().format("DD/MM HH:mm:ss").toString()}]`
    }

    updateLogChannel(channel) {
        this.logChannel = channel
    }

    logInChan(content) {
        if(this.logChannel) this.logChannel.send(content);
    }

}