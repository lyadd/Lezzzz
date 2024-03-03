module.exports = async (client, db, config, oldState, newState) => {
    if (!db.get(`Punish_${newState.guild.id}-${newState.member.id}`)) return;
    newState.member.voice.disconnect().catch(() => { })
}