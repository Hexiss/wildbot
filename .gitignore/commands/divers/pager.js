const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const paginationEmbed = require('discord.js-pagination');

module.exports = class PagerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pager',
            memberName: 'pager',
            group: 'divers',
            description: 'Test de pagination.',
            ownerOnly: false,
            clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            throttling: {
                usages: 2,
                duration: 10,
            },
        });
    }

    async run(msg) {
        const data = [
            {
                titre: 'Titre 1',
                texte: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget neque nunc. Nam venenatis leo varius cursus pulvinar. Quisque lacus enim, porta sed molestie quis, mattis quis ex. Mauris vestibulum purus eu nunc tempus viverra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris aliquet in lectus vel feugiat.'
            },
            {
                titre: 'Titre 2',
                texte: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pulvinar risus sit amet lorem efficitur, a tristique massa finibus. Praesent egestas, mi ut ultricies pharetra, nibh ante cursus magna, sed tempus neque dui ornare tortor. In lacinia, risus eu luctus fermentum, ligula dolor bibendum lectus, in molestie lacus erat ut nisl.'
            },
            {
                titre: 'Titre 3',
                texte: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec pretium mi. Maecenas sed ante mi. Ut ac odio sed neque consequat efficitur at ac augue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed hendrerit ultrices malesuada. Aenean congue eros nec.'
            }
        ];

        const pages = []

        for (const item of data) {
            const embed = new Discord.MessageEmbed()
                .setTitle(item.titre)
                .setDescription(item.texte)
            ;

            pages.push(embed)
        }

        paginationEmbed(msg, pages);
    }
};