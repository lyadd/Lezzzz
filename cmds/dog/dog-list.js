module.exports = {
    name: 'dog-list',
    dm: false,
    description: "Voir la liste des utilisateurs en laisse",
    type: "CHAT_INPUT",

    go: async (client, db, config, interaction, args) => {
        if (!db.get(`Owner_${interaction.guild.id}-${interaction.user.id}`) && !config.owners.includes(interaction.user.id) && interaction.user.id !== interaction.guild.ownerId) return interaction.reply({ content: `\`❌\` *Vous devez être \`owner\` executé cette commande !*`, ephemeral: true })

        var content = ""
        const owner = db
            .all()
            .filter((data) => data.ID.startsWith(`Dog_${interaction.guild.id}-`))
            .sort((a, b) => b.data - a.data);
        for (let i in owner) {
            if (owner[i].data === null) owner[i].data = 0;
            let userData = await client.users.fetch(owner[i].ID.split(`-`)[1])

            const t = db.get(`Dog_${interaction.guild.id}-${userData.id}`)
            await client.users.fetch(t.AuthorID)

            content += `
                <@${userData.id}> | \`${userData.id}\``
        }
        interaction.reply({
            embeds: [
                {
                    title: "Liste des utilisateurs en laisse",
                    description: content,
                    color: 0x2E3136,
                }
            ],
        })
    }
}