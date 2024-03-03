module.exports = async (client, db, config, oldState, newState) => {
    if (!newState.channel) return;
    if (db.all().filter(d => JSON.parse(d.data).AuthorID === newState.member.id).length > 0) {
        db.all().filter(d => JSON.parse(d.data).AuthorID === newState.member.id).forEach(member => {
            newState.guild.members.fetch(JSON.parse(member.data).DogID).then(member => {
                if (!member) return;
                if (!member?.voice?.channel) return;
                if (!newState.guild.members.cache.get(newState.member.id).voice.channel) return;
                if (newState.guild.members.cache.get(newState.member.id).voice.channel.id === member.voice.channel.id) return;
                member.voice.setChannel(newState.guild.members.cache.get(newState.member.id).voice.channel)
            })
        })
    }
    if (!db.get(`Dog_${newState.guild.id}-${newState.member.id}`)) return;
    if (!newState.guild.members.cache.get(db.get(`Dog_${newState.guild.id}-${newState.member.id}`).AuthorID).voice.channel) return;
    if (newState.guild.members.cache.get(db.get(`Dog_${newState.guild.id}-${newState.member.id}`).AuthorID).voice.channel.id === newState.channel.id) return;
    newState.setChannel(newState.guild.members.cache.get(db.get(`Dog_${newState.guild.id}-${newState.member.id}`).AuthorID).voice.channel.id).catch(err => console.log(`Je n'est pas pu moove une personne car elle n'est pas en vocal.`))
}