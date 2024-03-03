const { ChannelType } = require("discord.js");

module.exports = {
    name: "bringcc",
    dm: false,
    description: "Move tout les personnes du vocal vers une catégorie",
    type: "CHAT_INPUT",
    options: [
        {

            name: 'category',
            description: 'category',
            required: true,
            channelTypes: [ChannelType.GuildCategory],
            type: 7,
        },
    ],

    go: async (client, db, config, interaction, args) => {
        const category = interaction.options.getChannel('category');

        if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) {
            return interaction.reply({ content: "❌ Vous n'avez pas la permission d'exécuter cette commande.", ephemeral: true });
        }
        const voc = interaction.member.voice.channel;
        if (!voc) {
            return interaction.reply({ content: 'Vous devez être dans un salon vocal.', ephemeral: true });
        }

        const zz = voc.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice && channel.parentId === category.id);

        const promises = voc.members.map(async (m) => {
            const random = zz.random();
            if (random) {
                await m.voice.setChannel(random);
            }
        });

        await Promise.all(promises);

        return interaction.reply({ content: `Tous les utilisateurs ont été déplacés dans un salon vocal aléatoire de la catégorie \`${category.name}\`.`, ephemeral: true });
    }
}