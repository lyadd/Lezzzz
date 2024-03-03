module.exports = async (client, db, config, message) => {
    if (!message.member || !db.get(`Punish_${message.guild.id}-${message.member.id}`)) return;
    message.delete().catch(() => { })
}