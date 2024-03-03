module.exports = {
    name: "mv",
    dm: false,
    description: "Permet de move un utilisateur dans un vocal",
    type: "CHAT_INPUT",
    options: [
        {

            name: 'user',
            description: 'user',
            required: true,
            type: 6,
        },
    ],

    go: async (client, db, config, interaction, args) => {
        if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !db.get(`Wl_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({ content: `\`❌\` *Vous n'avez pas les permission pour executé cette commande*`, ephemeral: true })
        const user = interaction.options.getMember('user')
        if (!user.voice.channelId) return interaction.reply({ content: `*Ce membre n'est pas dans un salon vocal.*`, ephemeral: true })
        if (!interaction.member.voice.channel) return interaction.reply({ content: "*Veuillez rejoindre un salon vocal.*", ephemeral: true })
        if (user.voice.channel === interaction.member.voice.channel) return interaction.reply({ content: "*Il est dans votre vocal*", ephemeral: true })
        user.voice.setChannel(interaction.member.voice.channel).then(async () => {
            await interaction.reply({ embeds: [client.embed().setDescription(`*J\'ai déplacé ${user} dans <#${interaction.member.voice.channel.id}>*`)], ephemeral: true });
        })
    }
}