const fs = require('fs');
const ytdl = require('@distube/ytdl-core');
const { resolve } = require('path');
async function downloadMusicFromYoutube(link, path) {
  var timestart = Date.now();
  if(!link) return 'Thiếu link'
  var resolveFunc = function () { };
  var rejectFunc = function () { };
  var returnPromise = new Promise(function (resolve, reject) {
    resolveFunc = resolve;
    rejectFunc = reject;
  });
    ytdl(link, {
            filter: format =>
                format.quality == 'tiny' && format.audioBitrate == 48 && format.hasAudio == true
        }).pipe(fs.createWriteStream(path))
        .on("close", async () => {
            var data = await ytdl.getInfo(link)
            var result = {
                title: data.videoDetails.title,
                dur: Number(data.videoDetails.lengthSeconds),

                viewCount: data.videoDetails.viewCount,
                likes: data.videoDetails.likes,
                author: data.videoDetails.author.name,
                timestart: timestart
            }
            resolveFunc(result)
        })
  return returnPromise
}
module.exports.config = {
    name: "sing",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Phát nhạc thông qua link YouTube hoặc từ khoá tìm kiếm",
    commandCategory: "Tìm kiếm",
    usages: "[searchMusic]",
    cooldowns: 0
}

module.exports.handleReply = async function ({ api, event, handleReply, Users }) {
    const axios = require('axios')

  
    let name = await Users.getNameUser(event.senderID);


    const { createReadStream, unlinkSync, statSync } = require("fs-extra")
    try {
        var path = `${__dirname}/cache/sing-${event.senderID}.mp3`
        var data = await downloadMusicFromYoutube('https://www.youtube.com/watch?v=' + handleReply.link[event.body -1], path);
        if (fs.statSync(path).size > 26214400) return api.sendMessage(`${name}, bài dài quá đổi bài khác đi 😠`, event.threadID, () => fs.unlinkSync(path), event.messageID);
        api.unsendMessage(handleReply.messageID)
        return api.sendMessage({
body: `\n===『  𝙼𝚄𝚂𝙸𝙲  』===\n💤 𝚃𝚒𝚝𝚕𝚎: ${data.title}\n⏰ 𝚃𝚒𝚖𝚎: ${this.convertHMS(data.dur)}\n🌐 𝙰𝚞𝚝𝚑𝚘𝚛: ${data.author}\n💢 𝚆𝚒𝚎𝚠: ${data.viewCount}\n💫 𝙻𝚒𝚔𝚎: ${data.likes}\n💌 𝙾𝚛𝚍𝚎𝚛 𝚖𝚞𝚜𝚒𝚌: ${name}\n💨 𝚃𝚒𝚖𝚎 𝚡𝚞̛̉ 𝚕𝚒́: ${Math.floor((Date.now()- data.timestart)/1000)} 𝚐𝚒𝚊̂y`,
            attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
         event.messageID)
        }
    catch (e) { return console.log(e) }
}
module.exports.convertHMS = function(value) {
    const sec = parseInt(value, 10); 
    let hours   = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60); 
    let seconds = sec - (hours * 3600) - (minutes * 60); 
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return (hours != '00' ? hours +':': '') + minutes+':'+seconds;
}
module.exports.run = async function ({ api, event, args, Users}) {
    let axios = require('axios');
    let name = await Users.getNameUser(event.senderID);
    if (args.length == 0 || !args) return api.sendMessage(`${name}, không biết sài thì biến nhá 🐸`, event.threadID, event.messageID);
    const keywordSearch = args.join(" ");
    var path = `${__dirname}/cache/sing-${event.senderID}.mp3`
    if (fs.existsSync(path)) { 
        fs.unlinkSync(path)
    }
    if (args.join(" ").indexOf("https://") == 0) { 
        try {
            return api.sendMessage({ 
                body: `có cc`}, event.threadID, ()=> fs.unlinkSync(path), 
            event.messageID)       
        }
        catch (e) { return console.log(e) }
    } else {
          try {
            var link = [],
                msg = "",
                num = 0
            const Youtube = require('youtube-search-api');
            var data = (await Youtube.GetListByKeyword(keywordSearch, false,6)).items;
            for (let value of data) {
              link.push(value.id);
              num = num+=1
              msg += (`${num} - ${value.title} (${value.length.simpleText})\n\n`);
            }
            var body = `»🔎 𝐂𝐨́ ${link.length} 𝐊𝐞̂́𝐭 𝐐𝐮𝐚̉ 𝐓𝐢̀𝐦 𝐊𝐢𝐞̂́𝐦 𝐂𝐮̉𝐚 𝐁𝐚̣𝐧 𝐌𝐨𝐚𝐡:\n\n${msg}» 𝐇𝐚̃𝐲 𝐑𝐞𝐩𝐥𝐲 𝐓𝐫𝐨𝐧𝐠 𝐍𝐡𝐮̛̃𝐧𝐠 𝐓𝐢̀𝐦 𝐊𝐢𝐞̂́𝐦 𝐂𝐮̉𝐚 𝐁𝐚̣𝐧`
            return api.sendMessage({
              body: body
            }, event.threadID, (error, info) => global.client.handleReply.push({
              type: 'reply',
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              link
            }), event.messageID);
          } catch(e) {
            return api.sendMessage('『 𝚁𝚘𝚢𝚊𝚕 』 𝙴𝚛𝚛𝚘𝚛\n' + e, event.threadID, event.messageID);
        } // đêm qua em tuyệt lắm
    } // thần la thiên đinhhh
      } // cục xì lầu ông bê lăc