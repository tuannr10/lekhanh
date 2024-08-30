module.exports.config = {
  name: "pingall",
  version: "1.0.0",
  isAdmin: true,
  credits: "Mirai Team",
  description: "Tag toàn bộ thành viên đang hoạt động trong các nhóm",
  commandCategory: "Admin",
  usages: "[Text]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  try {
    const botID = api.getCurrentUserID();
    
    // Check if the user is an admin
    if (!event.isAdmin) {
      await api.sendMessage("Mày là ai ?", event.threadID, event.messageID);
      return;
    }
    
    const threadList = await api.getThreadList(100, null, ["INBOX"]);
    let successThreads = [];
    let failedThreads = [];

    for (const thread of threadList) {
      if (thread.isGroup) {
        try {
          const threadInfo = await api.getThreadInfo(thread.threadID);
          const activeMembers = threadInfo.participantIDs.filter(id => id !== botID && id !== event.senderID && !threadInfo.leftParticipantIDs.includes(id));
          var body = (args.length !== 0) ? args.join(" ") : "Các con vợ dậy tương tác🤘🏻", mentions = [], index = 0;

          for (const idUser of activeMembers) {
            body = "‎" + body;
            mentions.push({ id: idUser, tag: "‎", fromIndex: index - 1 });
            index -= 1;
          }

          await api.sendMessage({ body, mentions }, thread.threadID);
          successThreads.push(thread.name || thread.threadID);
        } catch (error) {
          failedThreads.push(thread.name || thread.threadID);
        }
      }
    }

    let replyMessage = "";
    if (successThreads.length > 0) {
      replyMessage += `Đã tag thành công các thành viên đang hoạt động trong các nhóm sau: \n${successThreads.map((name, index) => `${index + 1}. ${name}`).join("\n")}\n`;
    }
    if (failedThreads.length > 0) {
      replyMessage += `Không thể tag thành viên trong các nhóm sau: \n${failedThreads.map((name, index) => `${index + 1}. ${name}`).join("\n")}\n`;
    }
    if (replyMessage.length > 0) {
      await api.sendMessage(replyMessage, event.threadID, event.messageID);
    } else {
      await api.sendMessage("Không có nhóm nào để tag.", event.threadID, event.messageID);
    }
  } catch (e) {
    console.error(e);
    await api.sendMessage("Đã xảy ra lỗi khi thực hiện lệnh.", event.threadID, event.messageID);
  }
}
