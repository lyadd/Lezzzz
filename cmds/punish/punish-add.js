module.exports = {
    name: 'punish-add',
    dm: false,
    description: "Ajouter un utilisateur au punish",
    type: "CHAT_INPUT",
    options: [
        {

            name: 'user',
            description: 'user',
            type: 6,
            required: true,
        },
    ],

    go: async (client, db, config, interaction, args) => {

        const
            user = interaction.options.getUser('user'),
            member = interaction.guild.members.cache.get(user.id);

        if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({ content: `\`❌\` *Vous devez être \`owner\` executé cette commande !*`, ephemeral: true })

        if (user === null) return interaction.reply({ content: `\`❌\` *Vous devez assigner un utilisateur pour faire ceci !*`, ephemeral: true })
        if (user.id === interaction.user.id) return interaction.reply({ content: "\`❌\` *Vous ne pouvez pas vous punish !*", ephemeral: true })
        if (db.get(`Owner_${interaction.guild.id}-${user.id}`) !== null) return interaction.reply({ content: "\`❌\` *Vous ne pouvez pas punish un \`owner\` !*", ephemeral: true })
        if (db.get(`Punish_${interaction.guild.id}-${user.id}`) === null) {
            db.set(`Punish_${interaction.guild.id}-${user.id}`, { DogID: user.id, AuthorTag: interaction.user.tag, AuthorID: interaction.user.id, Date: `<t:${Math.floor(Date.now() / 1000)}:R>` })

            interaction.reply({
                embeds: [
                    {
                        description: `⚖️ *${user} a bien été punish !*`,
                        color: 0x2E3136,
                    }
                ]
            })

            member.setNickname(`\uD83D\uDC15 ${user.username} (\uD83D\uDC51 ${interaction.user.username})`).catch(() => { });

        } else {
            interaction.reply({
                content: `\`❌\` *L'utilisateur est déja punish !*`,
                ephemeral: true
            })
        }
    }
}