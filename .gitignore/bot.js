const CommandoClient = require('./client');
const path = require('path');
const fs = require('fs')
const dotenv = require('dotenv')

}

const client = new CommandoClient({
    commandPrefix: 'w.',
    disableMentions: 'everyone',
    presence: {
        activity: {
            name: `Le père castor`, // message de présence
            type: 'LISTENING' // type d'activité
        }
    }
});

/// AUTO REACT /// test server
client.on('message', message => {
    if (message.channel.id === "781531711530991626") {
        message.react('👍');
        message.react('👎');
        message.author.send("Ta suggestion a bien été prise en compte, l'équipe **Wildsens** te remercie pour ton investissement ! :heart:"); 
    }
});
/// AUTO REACT ///

/// AUTO REACT /// wildsens
client.on('message', message => {
    if (message.channel.id === "779729352505688074") {
        message.react('👍');
        message.react('👎');
        message.author.send("Ta suggestion a bien été prise en compte, l'équipe **Wildsens** te remercie pour ton investissement ! :heart:"); 
    }
});
/// AUTO REACT ///

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
        const eventFunction = require(`./events/${file}`);
        if (eventFunction.disabled) return;

        const event = eventFunction.event || file.split('.')[0];
        const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client;
        const { once } = eventFunction;

        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(client, ...args));
        } catch (error) {
            console.error(error.stack);
        }
    });
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['divers', 'Divers'],
        ['admin', 'Admin'],
        ['bot', 'Bot'],

    ])
    .registerCommandsIn(path.join(__dirname, 'commands'))
;

client.login(process.env.TOKEN);
