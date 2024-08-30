module.exports.config = {
    name: 'setname',
    version: '3.0.0',
    hasPermssion: 0,
    credits: 'Vtuan',
    description: 'Đổi biệt danh trong nhóm của bạn hoặc của người bạn tag',
    commandCategory: 'Thành Viên',
    usages: '[trống/reply/tag] + [name]',
    cooldowns: 5
};

module.exports.run = async ({ api, event, args, Users }) => {
    let { threadID, messageReply, senderID, mentions, type } = event;
    const mention = Object.keys(mentions)[0];
    if (args.join().indexOf('@') !== -1 ) {
        const name = args.join(' ')
        api.changeNickname(`${name.replace(mentions[mention],"")}`, threadID, mention, e => !e ? api.sendMessage(`${!args[0] ? 'Gỡ': 'Thay đổi'} biệt danh hoàn tất!`, event.threadID) : api.sendMessage(`[ ! ] - Hiện tại nhóm đang bật liên kết tham gia nên bot không thể set được biệt danh cho người dùng,hãy tắt liên kết mời để có thể xử dụng tính năng này!`, event.threadID));
    } else {
        api.changeNickname(args.join(' '), event.threadID,event.type == 'message_reply' ? event.messageReply.senderID : event.senderID, e => !e ? api.sendMessage(`${!args[0] ? 'Gỡ': 'Thay đổi'} biệt danh hoàn tất!`, event.threadID) : api.sendMessage(`[ ! ] - Hiện tại nhóm đang bật liên kết tham gia nên bot không thể set được biệt danh cho người dùng,hãy tắt liên kết mời để có thể xử dụng tính năng này!`, event.threadID));
    }
}