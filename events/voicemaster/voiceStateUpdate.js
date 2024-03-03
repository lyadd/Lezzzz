module.exports = async (client, db, config, oldState, newState) => {
    const
        channel = newState.channel,
        member = newState.member;

    if (!newState.channel) return;
    if (db.get(`blchannelmd_${member.guild.id}_${channel.id}`) !== null) {
        if (!db.get(`access_${member.guild.id}_${channel.id}_${member.id}`)) {
            member.voice.setChannel(null);
        }
    }
}