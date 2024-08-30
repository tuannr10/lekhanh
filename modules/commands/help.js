module.exports.config = {
 name: "help",
 version: "1.1.2",
 hasPermssion: 0,
 credits: "HelyT",
 description: "Hướng dẫn sử dụng lệnh.",
 commandCategory: "Thành Viên",
 usages: "[Tên lệnh]",
 cooldowns: 1,
};
module.exports.handleEvent = function ({ api, event }) {
 const { commands } = global.client;
 if (!event.body) return;
 const { threadID, messageID, body } = event;
 if (body.indexOf("Help") != 0) return;
 const splitBody = body.slice(body.indexOf("Help")).trim().split(/\s+/);
 if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
 const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
 const command = commands.get(splitBody[1].toLowerCase());
 const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
 return api.sendMessage(`╭── HELP ────⭓\n│ Tên lệnh: ${command.config.name} \n├── INFO\n│ Mô tả: ${command.config.description}\n│ Thuộc nhóm: ${command.config.commandCategory}\n│ Thời gian chờ: ${command.config.cooldowns} giây(s)\n│ Quyền sử dụng: ${((command.config.hasPermssion == 0) ? "Tất cả mọi người" : (command.config.hasPermssion == 1) ? "Quản trị viên" : (command.config.hasPermssion == 2) ? "Người điều hành bot" : "Admin bot" )}\n│ Credit: ${command.config.credits}\n├── USAGE\n│${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}\n╰──────────⭔`, threadID, messageID);
};
module.exports.run = async function({ api, args, Users, event, Threads, utils, client }) {
const { commands } = global.client;
const { threadID, messageID } = event;
const command = commands.get((args[0] || "").toLowerCase());
const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
if (!command) {
const command = commands.values();
var lon = `U là trời bot làm gì có lệnh này -.- \n\nNếu là lần đầu xài bot thì bạn có thể dùng lệnh ${global.config.PREFIX}menu để xem hướng dẫn tất cả các lệnh có trên bot nha.\n\nBot iu bạn nhìu :3`;
return api.sendMessage(lon, event.threadID, event.messageID);
}
const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
return api.sendMessage(`╭── HELP ────⭓\n│ Tên lệnh: ${command.config.name} \n├── INFO\n│ Mô tả: ${command.config.description}\n│ Thuộc nhóm: ${command.config.commandCategory}\n│ Thời gian chờ: ${command.config.cooldowns} giây(s)\n│ Quyền sử dụng: ${((command.config.hasPermssion == 0) ? "Tất cả mọi người" : (command.config.hasPermssion == 1) ? "Quản trị viên" : (command.config.hasPermssion == 2) ? "Người điều hành bot" : "Admin bot" )}\n│ Credit: ${command.config.credits}\n├── USAGE\n│${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}\n╰──────────⭔`, threadID, messageID);
};