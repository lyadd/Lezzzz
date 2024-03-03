module.exports = {
    name: 'punish-info',
    dm: false,
    description: "Voir les infos d'un utilisateur punish",
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

        const user = interaction.options.getUser('user');

        if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({ content: `\`❌\` *Vous devez être \`owner\` executé cette commande !*`, ephemeral: true })

        if (user !== null) {
            if (db.get(`Punish_${interaction.guild.id}-${user.id}`) !== null) {
                let infoData = db.get(`Punish_${interaction.guild.id}-${user.id}`)
                interaction.reply({
                    ephemeral: true,
                    embeds: [
                        {
                            color: 0x2E3136,
                            description: `
    **__Informations du punish__**

    **Auteur : **
     Nom d'utilisateur : <@${infoData.AuthorID}>
     Identifiant : \`${infoData.AuthorID}\`

    **Victime : **
     Nom d'utilisateur : ${user}
     Identifiant : \`${user.id}\`

   **__Informations Supplémentaires__**
    Date : ${infoData.Date}
    `
                        }
                    ]
                })
            } else {
                interaction.reply({ content: `\`❌\` L'utilisateur n'est pas punish !*`, ephemeral: true })
            }
        }
    }
}