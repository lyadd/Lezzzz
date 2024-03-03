const { ChannelType } = require("discord.js");

module.exports = {
    name: "join",
    dm: false,
    description: "Permet de join une voc",
    type: "CHAT_INPUT",
    options: [
        {

            name: 'voice',
            description: 'voice',
            required: true,
            channelTypes: [ChannelType.GuildVoice],
            type: 7,
        },
    ],

    go: async (client, db, config, interaction, args) => {
        if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !db.get(`Wl_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({ content: `\`❌\` *Vous n'avez pas les permission pour executé cette commande*`, ephemeral: true })
        const channel = interaction.options.getChannel('voice')
        const user = interaction.member
        if (!user.voice.channel) return interaction.reply({ content: "*tu n'es pas dans une vocal*", ephemeral: true })
        user.voice.setChannel(channel)
        await interaction.reply({ embeds: [client.embed().setDescription(`*Tu as bien été move dans le vocal ${channel}*`)], ephemeral: true });
    }
}