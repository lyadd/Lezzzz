const { ChannelType } = require("discord.js");

module.exports = {
    name: 'pv',
    dm: false,
    description: "Fermer la vocal pour que personne join",
    type: "CHAT_INPUT",
    options: [
        {
            name: 'type',
            description: 'Channel',
            required: true,
            type: 3,
            choices: [
                {
                    name: 'add',
                    value: 'add'
                },
                {
                    name: 'remove',
                    value: 'remove'
                },
                {
                    name: 'list',
                    value: 'list'
                },
            ],
        },
        {
            name: 'channel',
            description: 'channel',
            type: 7,
            required: false,
            channelTypes: [ChannelType.GuildVoice],
        }
    ],

    go: async (client, db, config, interaction, args) => {
        const
            type = interaction.options.getString('type'),
            channel = interaction.options.getChannel('channel')


        if (type === 'add') {
            if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({ content: `\`❌\` *Vous n'avez pas les permission pour executé cette commande*`, ephemeral: true })
            if (db.get(`blchannelmd_${interaction.guild.id}_${channel.id}`) === true) { return interaction.reply({ content: `${channel} est déjà mis en pv.`, ephemeral: true }); }
            db.set(`blchannelmd_${interaction.guild.id}_${channel.id}`, true);
            return interaction.reply({ content: `${channel} est maintenant pv`, ephemeral: true });
        }

        if (type === 'remove') {
            if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({ content: `\`❌\` *Vous n'avez pas les permission pour executé cette commande*`, ephemeral: true })
            if (db.get(`blchannelmd_${interaction.guild.id}_${channel.id}`) !== true) { return interaction.reply({ content: `${channel} n'est pas un salon pv.`, ephemeral: true }); }
            db.delete(`blchannelmd_${interaction.guild.id}_${channel.id}`);
            return interaction.reply({ content: `${channel} a été supprimé des pv.`, ephemeral: true });
        }

        if (type === 'list') {
            if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({ content: `\`❌\` *Vous n'avez pas les permission pour executé cette commande*`, ephemeral: true })
            const tt = await db.all().filter(data => data.ID.startsWith(`blchannelmd_${interaction.guild.id}`));
            const zz = tt.length;

            if (zz === 0) {
                return interaction.reply({ content: 'Aucun salon pv trouvé.', ephemeral: true });
            }

            const list = tt.map(data => {
                const channelId = data.ID.replace(`blchannelmd_${interaction.guild.id}_`, '');
                const channel = interaction.guild.channels.cache.get(channelId);
                return channel ? `<#${channel.id}>` : `<#${channelId}>`;
            });

            await interaction.reply({ embeds: [client.embed().setDescription(`Salons pv :\n\n ${list.join('\n')}`)], ephemeral: true });
        }
    }
}