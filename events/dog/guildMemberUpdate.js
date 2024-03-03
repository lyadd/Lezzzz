module.exports = async (client, db, config, oldMember, newMember) => {
    if (oldMember.nickname === newMember.nickname) return;
    const authorTag = db.get(`Dog_${newMember.guild.id}-${newMember.id}.AuthorTag`);
    if (!authorTag) return;
    const authorUsername = authorTag.split('#')[0];
    const memberName = `\uD83D\uDC15 ${newMember.user.username} (\uD83D\uDC51 ${authorUsername})`;
    newMember.setNickname(memberName).catch(err => console.log("Je n'ai pas pu renommer la personne."));
}