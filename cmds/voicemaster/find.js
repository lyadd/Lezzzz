module.exports = {
    name: "find",
    dm: false,
    description: "Permet de chercher un membre en vocal dans le serveur",
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
        const user = interaction.options.getMember('user')
        if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !db.get(`Wl_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({ content: `\`❌\` *Vous n'avez pas les permission pour executé cette commande*`, ephemeral: true })
        await interaction.reply({ embeds: [client.embed().setDescription(user.voice.channel ? `**${user}** (\`${user.id}\`) *est dans le vocal* <#${user.voice.channel.id}>` : `**${user}** (\`${user.id}\`) *n'est pas en vocal*`)], ephemeral: true });
    }
}