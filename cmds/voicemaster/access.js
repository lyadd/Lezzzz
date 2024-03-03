const { ChannelType } = require("discord.js");

module.exports = {
    name: "access",
    dm: false,
    description: "Permet de donner accès à une personne à un salon lock",
    type: "CHAT_INPUT",
    options: [
        {
            name: 'user',
            description: 'Utilisateur',
            required: true,
            type: 6,
        },
        {
            name: 'channel',
            description: 'Salon vocal',
            required: true,
            type: 7,
            channelTypes: [ChannelType.GuildVoice],
        },
    ],

    go: async (client, db, config, interaction, args) => {
        const
            user = interaction.options.getMember('user'),
            channel = interaction.options.getChannel('channel'),
            guild = interaction.guild;

        if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({ content: `\`❌\` *Vous n'avez pas les permission pour executé cette commande*`, ephemeral: true })

        if (db.get(`access_${guild.id}_${channel.id}_${user.id}`) === true) {
            return interaction.reply({
                content: `L'utilisateur ${user.user.username} a déjà accès au salon vocal ${channel}`,
                ephemeral: true,
            });
        }

        db.set(`access_${guild.id}_${channel.id}_${user.id}`, true);

        return interaction.reply({
            content: `L'utilisateur ${user.user.username} a maintenant accès au salon vocal ${channel}`,
            ephemeral: true,
        });
    },
};