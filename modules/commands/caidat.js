const fs = require("fs");
const request = require("request");
const path = require('path');
const pathToAutoSetNameData = __dirname + '/cache/data/autosetname.json';
const pathToAntiSpamData = __dirname + '/cache/data/antispamStatus.json';
const messageCountFolderPath = path.join(__dirname, '../../modules/commands/cache/data/messageCounts');
const antiImageFilePath = path.join(__dirname, 'cache/data/antiImages/antiImage.json');
const filePath = path.resolve(__dirname, "../../modules/events/cache/data/namebox.json");

module.exports.config = {
  name: "caidat",
  version: "1.0.0",
  hasPermission: 1,
  credits: "Vtuan",
  description: "Xem tất cả cài đặt của nhóm!",
  commandCategory: "Quản Trị Viên",
  usages: "...",
  cooldowns: 5,
};

module.exports.run = async ({ api, event ,Threads, args }) => {
  let filesystem = global.nodemodule["fs-extra"];
  let threadSettings = await api.getThreadInfo(event.threadID);
  const threadID = event.threadID.toString();
  const ThreadData = global.data.threadData; 
  let antispamStatusMsg, spamCountMsg, spamTimeMsg, antispamSettings;
  let autoSetNameMsg;
  let antiImageStatusMsg;
  let threadTitle = threadSettings.threadName;
  let groupId = threadSettings.threadID;

  // Approval mode data
  let approvalModeStatus = threadSettings.approvalMode;
  var approvalModeText = approvalModeStatus == false ? 'tắt' : approvalModeStatus == true ? 'bật' : 'Kh';

  // Antispam data
  if (!filesystem.existsSync(pathToAntiSpamData)) {
    antispamStatusMsg = "Chưa cài đặt antispam!";
  } else {
    let antispamData = JSON.parse(filesystem.readFileSync(pathToAntiSpamData, "utf-8"));
    let threadAntispamData = antispamData.find(item => item.threadID === event.threadID.toString());
    if (threadAntispamData && threadAntispamData.status === true) {
      antispamStatusMsg = "Bật";
      spamCountMsg = `${threadAntispamData.spamCount}`;
      spamTimeMsg = `${(threadAntispamData.spamTime / 1000).toFixed(2)}s`;
      antispamSettings = `${spamCountMsg}|${spamTimeMsg}`
    } else {
      antispamStatusMsg = "Tắt";
      spamCountMsg = "";
      spamTimeMsg = "";
      antispamSettings = ``
    }
  }


  // Auto set name data
  if (!filesystem.existsSync(pathToAutoSetNameData)) {
    autoSetNameMsg = "Không có";
  } else {
    let autoSetNameData = JSON.parse(filesystem.readFileSync(pathToAutoSetNameData, "utf-8"));
    let threadAutoSetName = autoSetNameData.find(item => item.threadID === event.threadID.toString());
    if (threadAutoSetName && threadAutoSetName.nameUser && threadAutoSetName.nameUser.length > 0) {
      autoSetNameMsg = `Bật (${threadAutoSetName.nameUser})`;
    } else {
      autoSetNameMsg = "Không có";
    }
  }

  /// Anti out data
  let threadExtraData = await Threads.getData(event.threadID);
  let isAntiOutEnabled = threadExtraData.data && threadExtraData.data.antiout;
  let antiOutStatusMsg = isAntiOutEnabled ? "Bật" : "Tắt";

  // Message rank data
  const currentThreadID = event.threadID;
  const directoryContent = await filesystem.readdir(messageCountFolderPath);
  const messageCountFiles = directoryContent.filter((file) => file.endsWith('.json'));
  let groupMessageCountStats = [];
  for (const file of messageCountFiles) {
    const filePath = path.join(messageCountFolderPath, file);
    const data = await filesystem.readJson(filePath);
    const totalMsgs = data.reduce((acc, cur) => acc + cur.count, 0);
    groupMessageCountStats.push({ threadID: file.replace('.json', ''), totalMessages: totalMsgs });
  }
  groupMessageCountStats.sort((a, b) => b.totalMessages - a.totalMessages);
  const currentGroupRank = groupMessageCountStats.findIndex(group => group.threadID === currentThreadID) + 1;
  const currentGroupMsgCount = groupMessageCountStats.find(group => group.threadID === currentThreadID).totalMessages;
  const totalGroupCount = groupMessageCountStats.length;
  const msgRankText = `Nhóm đứng top: ${currentGroupRank} server với ${currentGroupMsgCount} tin nhắn`;

   /// Anti image data
  try {
    const antiImageJSONData = filesystem.readJsonSync(antiImageFilePath);
    const antiImageData = antiImageJSONData.find(item => item.id === threadID);
    antiImageStatusMsg = antiImageData ? (antiImageData.status ? "Bật" : "Tắt") : "tắt";
  } catch (error) {
    console.error('Không thể đọc dữ liệu từ file antiImage.json', error);
    antiImageStatusMsg = "Không thể xác định";
  }
/// Antinamebox data 
  const nameboxData = filesystem.readJsonSync(filePath, { throws: false }) || [];
  const nameboxEntry = nameboxData.find(entry => entry.threadID == threadID);

  const nameboxStatusText = nameboxEntry && nameboxEntry.status ? "bật" : "tắt";
/// Antiqtv data
  const qtvThreadData = ThreadData.get(threadID);
  const isAntiQTVGuardOn = qtvThreadData && qtvThreadData.data && qtvThreadData.data.guard === true;
  const antiQTVStatusText = isAntiQTVGuardOn ? "bật" : "tắt";

  return api.sendMessage(`== [ Cài Đặt Nhóm ] ==\n────────────\n→ Tên nhóm: ${threadTitle || "không có"}\n→ ID: ${groupId}\n→ Phê duyệt: ${approvalModeText}\n→ Antispam: ${antispamStatusMsg} ${antispamSettings}\n→ Autosetname: ${autoSetNameMsg}\n→ Antiout: ${antiOutStatusMsg}\n→ Anti ảnh nhóm: ${antiImageStatusMsg}\n→ Anti tên nhóm: ${nameboxStatusText}\n→ Anti qtv: ${antiQTVStatusText}\n────────────\n${msgRankText}`, event.threadID)
}