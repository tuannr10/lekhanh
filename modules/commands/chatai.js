const axios = require('axios');
const apiKey = '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';
if (!global.notWaitForPrefixs)
    global.notWaitForPrefixs = [];

if (!global.openAIUsing)
    global.openAIUsing = {};
if (!global.openAIUsing)
    global.openAIUsing = {};

module.exports.config = {
    name: 'chatai',
    version: '1.0.0',
    hasPermssion: 0,
    credits: 'NTKhang',
    description: 'OpenAI ChatGPT',
    commandCategory: 'Tiện ích',
    usages: 'text | img <text>',
    cooldowns: 5
};


module.exports.languages = {};

module.exports.handleReply = async function ({ api, event, handleReply }) {
    if (handleReply.senderID != event.senderID)
        return;
    if (global.notWaitForPrefixs.includes(event.messageReply?.messageID))
        return;
    if (handleReply?.type == 'choosee') {
        api.unsendMessage(handleReply.messageID);
        const sendMessage = async ({ body, attachment }) => {
            return api.sendMessage({
                body,
                attachment: (await global.nodemodule["axios"]({
                    url: (await global.nodemodule["axios"](attachment)).data.url,
                    method: "GET",
                    responseType: "stream"
                })).data
            }, event.threadID, event.messageID)
        }
        switch (event.body) {
            case '1':
                await sendMessage({
                    body: `🌸 𝗧𝗥𝗘𝗡𝗗 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 🌸\n━━━━━━━━━━━━━━\n🐼 𝗟𝗶𝘀𝘁 𝗹𝗲̣̂𝗻𝗵 𝘁𝗵𝘂̛𝗼̛̀𝗻𝗴 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 🐼\n🌸 /𝗵𝗲𝗹𝗽 𝗮𝗹𝗹: xem tất cả lệnh của bot\n💞 /𝘁𝘁 𝗮𝗹𝗹: kiểm tra tương tác thành viên nhóm\n🌷 /𝘁𝘁: kiểm tra tương tác cá nhân\n💕 /𝗯𝗼𝘅 𝗶𝗻𝗳𝗼: xem thông tin nhóm\n💍 /𝗴𝗵𝗲𝗽: ghép đôi random \n🕊️ /𝘁𝗶𝗻𝗱𝗲𝗿: ghép đôi chọn giới tính\n☠️ /𝘁𝘁 𝗹𝗼𝗰𝗺𝗲𝗺: lọc tv theo số tin nhắn\n💝 /𝘀𝗲𝘁𝗻𝗮𝗺𝗲: set biệt danh tại nhóm\n💓 /𝘆𝗼𝘂𝘁𝘂𝗯𝗲: tải video hoặc nhạc youtube\n🎥 /𝘁𝗶𝗸𝘁𝗼𝗸: công cụ tải hoặc xem info\n🎼 /𝗺𝘂𝘀𝗶𝗰: phát nhạc youtube\n👤 /𝗶𝗻𝘀: công cụ đa dạng\n🔗 /𝗶𝗺𝗴𝘂𝗿 + 𝗿𝗲𝗽𝗹𝘆 𝗮̉𝗻𝗵: up ảnh lấy link\n💗 /𝗻𝗲𝘁𝗮𝗻𝗵 & 𝗿𝗲𝗽𝗹𝘆 𝗮̉𝗻𝗵: làm nét ảnh bạn chọn\n🌹 /𝗮𝘃𝘁𝗱𝗼𝗶: gửi avt anime đôi\n💞 /𝗾𝗿 + 𝗾𝗿𝘀: 𝗹𝗮̀𝗺 𝗾𝗿 𝘃𝗮̀ 𝗾𝘂𝗲́𝘁 𝗾𝗿`,
                    attachment: `${global.configApi.domain}/images/mong`
                });
                break;
            case '2':
                await sendMessage({
                    body: `=「 𝗗𝗔𝗡𝗛 𝗦𝗔́𝗖𝗛 𝗔𝗗𝗠𝗜𝗡 」=\n━━━━━━━━━━━━━━\n𝗧𝗲̂𝗻: Nguyễn Tuấn Ninh\n» 𝗟𝗶𝗻𝗸 𝗙𝗕: https://www.facebook.com/100040472494187`,
                    attachment: `${global.configApi.domain}/images/admin`
                })
                break;
            case '3':
                await sendMessage({
                    body: `🌸== [ 𝘛𝘢𝘵𝘴𝘶𝘠𝘛𝘉💤 ] ==🌸`,
                    attachment: `${global.configApi.domain}/images/autosend`
                })
                break;
            case '4':
                const { ADMINBOT, NDH, BOTNAME, PREFIX } = global.config;
                const { commands } = global.client;
                const axios = require('axios');
                const res = await axios.get(`${global.configApi.domain}/poem/love`);
                var poem = res.data.data;
                api.unsendMessage(handleReply.messageID);
                await sendMessage({
                    body: `🌸==== [ 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢 ] ====🌸\n━━━━━━━━━━━━━━\n\n🖥 𝗠𝗼𝗱𝘂𝗹𝗲𝘀: 𝗖𝗼́ ${commands.size} 𝗹𝗲̣̂𝗻𝗵 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 𝘁𝗿𝗲̂𝗻 𝗯𝗼𝘁\n📎 𝗣𝗿𝗲𝗳𝗶𝘅: 𝗗𝗮̂́𝘂 𝗹𝗲̣̂𝗻𝗵 𝗵𝗲̣̂ 𝘁𝗵𝗼̂́𝗻𝗴 𝘁𝗿𝗲̂𝗻 𝗯𝗼𝘁 𝗹𝗮̀ [ ${PREFIX} ]\n💓 𝗡𝗮𝗺𝗲 𝗯𝗼𝘁: ${BOTNAME}\n💬 𝗟𝗶𝘀𝘁𝗯𝗼𝘅: 𝗛𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶 𝗯𝗼𝘁 đ𝗮𝗻𝗴 𝗼̛̉ ${global.data.allThreadID.length} 𝗯𝗼𝘅\n👑 𝗕𝗼𝘁 𝗵𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶 𝗰𝗼́ ${ADMINBOT.length} 𝗮𝗱𝗺𝗶𝗻 𝘃𝗮̀ ${NDH.length} 𝘀𝘂𝗽𝗽𝗼𝗿𝘁\n━━━━━━━━━━━━━━\n${poem} 💓`,
                    attachment: `${global.configApi.domain}/images/naughty`
                })
                break;
        }
    }
    const text = await askGPT(event.body, event.senderID);
    console.log(text)
    return api.sendMessage(text, event.threadID, (err, info) => {
        if (err) return;
        global.client.handleReply.push({
            name: 'gpt',
            messageID: info.messageID,
            senderID: event.senderID
        });
    }, event.messageID);

}

module.exports.handleReaction = async function ({ api, event, handleReaction }) {
    if (event.userID != handleReaction.senderID) return;
    var reactionList = ['👍', '🌸', '❤️']; // Các reaction có thể sử dụng
    var allIcon = ["💞", "💖", "💗", "💜", "🌸", "💗", "💝", "🎀", "🌹", "🍁", "🖤", "🍑", "🍁"];
    var rd = allIcon[Math.floor(Math.random() * allIcon.length)];
    switch (handleReaction.type) {
        case 'sailenh': {
            if (reactionList.includes(event.reaction)) {
                api.unsendMessage(handleReaction.messageID);
                return api.sendMessage({
                    body: `🌸= 𝗠𝗘𝗡𝗨 𝗧𝗛𝗢̂𝗡𝗚 𝗧𝗜𝗡 =🌸\n━━━━━━━━━━━━━━\n\n𝟭. 𝗫𝗲𝗺 𝗹𝗶𝘀𝘁 𝗹𝗲̣̂𝗻𝗵 𝘁𝗵𝘂̛𝗼̛̀𝗻𝗴 𝗱𝘂̀𝗻𝗴 \n𝟮. 𝗜𝗻𝗳𝗼 𝗔𝗱𝗺𝗶𝗻 𝗕𝗼𝘁 ${rd}\n𝟯. 𝗠𝘂𝗮 𝗳𝗶𝗹𝗲, 𝘁𝗵𝘂𝗲̂ 𝗯𝗼𝘁 \n𝟰. 𝗧𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝘃𝗲̂̀ 𝗕𝗼𝘁 \n\n𝙍𝙚𝙥𝙡𝙮 𝙩𝙞𝙣 𝙣𝙝𝙖̆́𝙣 𝙣𝙖̀𝙮 𝙠𝙚̀𝙢 𝙩𝙝𝙚𝙤 𝙎𝙏𝙏 𝙢𝙖̀ 𝙗𝙖̣𝙣 𝙢𝙪𝙤̂́𝙣 𝙭𝙚𝙢`,
                    attachment: (await global.nodemodule["axios"]({
                        url: (await global.nodemodule["axios"](`${global.configApi.domain}/images/du`)).data.url,
                        method: "GET",
                        responseType: "stream"
                    })).data
                }, event.threadID, (err, info) => {
                    if (err) return;
                    global.client.handleReply.push({
                        type: "choosee",
                        name: this.config.name,
                        senderID: event.userID,
                        messageID: info.messageID
                    })
                })
            }
        }
    }
}

module.exports.handleEvent = async function ({ api, event, Threads }) {
    const threadData = (await Threads.getData(event.threadID)).data;
    if (!threadData?.['openAI'])
        return;

    if (event.body) {
        const text = await askGPT(event.body, event.senderID);
        return api.sendMessage(text, event.threadID, event.messageID);
    }
};

module.exports.run = async function ({
    api, event, args, Threads
}) {
    switch (args[0]) {
        case 'img':
        case 'image':
        case 'draw': {
            if (!args[1])
                return api.sendMessage('Vui lòng nhập nội dung', event.threadID, event.messageID);
            if (global.openAIUsing[event.senderID])
                return api.sendMessage('Bạn đang sử dụng tính năng này, vui lòng chờ quay lại sau khi yêu cầu trước kết thúc', event.threadID, event.messageID);

            global.openAIUsing[event.senderID] = true;

            try {
                const sending = api.sendMessage('Đang xử lý yêu cầu của bạn...', event.threadID, event.messageID);
                const responseImage = await axios({
                    url: "https://api.openai.com/v1/images/generations",
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + apiKey,
                        "Content-Type": "application/json"
                    },
                    data: {
                        prompt: args.slice(1).join(' '),
                        n: 4,
                        size: '1024x1024'
                    }
                });
                const imageUrls = responseImage.data.data;
                const images = await Promise.all(imageUrls.map(async (item) => {
                    const image = await axios.get(item.url, {
                        responseType: 'stream'
                    });
                    image.data.path = `${Date.now()}.png`;
                    return image.data;
                }));
                return api.sendMessage({
                    attachment: images
                }, event.threadID, async () => {
                    api.unsendMessage(await sending.messageID);
                    delete global.openAIUsing[event.senderID];
                }, event.messageID);
            }
            catch (err) {
                const errorMessage = err.response?.data.error.message || err.message;
                return api.sendMessage(`Đã có lỗi xảy ra\n${errorMessage}`, event.threadID, () => {
                    delete global.openAIUsing[event.senderID];
                }, event.messageID);
            }
        }

        case 'on':
        case 'off': {
            const threadData = (await Threads.getData(event.threadID)).data;
            threadData['openAI'] = args[0] == 'on';
            await Threads.setData(event.threadID, { data: threadData });
            return api.sendMessage(`Đã ${args[0] == 'on' ? 'bật' : 'tắt'} tính năng OpenAI trong nhóm này`, event.threadID, event.messageID);
        }

        default: {
            if (!args[1])
                return api.sendMessage('Vui lòng nhập nội dung', event.threadID, event.messageID);

            try {
                const text = await askGPT(args.join(' '), event.senderID);
                return api.sendMessage(text, event.threadID, (err, info) => {
                    if (err) return console.log(err);
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        senderID: event.senderID
                    });
                }, event.messageID);
            }
            catch (err) {
                console.log(err.response?.data);
                const errorMessage = err.response?.data.error.message || err.message;
                return api.sendMessage(`Đã có lỗi xảy ra\n${errorMessage}`, event.threadID, () => {
                    delete global.openAIUsing[event.senderID];
                }, event.messageID);
            }
        }
    }
};


async function askGPT(question, senderID) {
    try {
        const response = await axios({
            url: "https://api.openai.com/v1/chat/completions",
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            data: {
                model: "gpt-3.5-turbo",
                messages: [{
                    role: 'user',
                    content: question
                }],
                max_tokens: 4000,
                temperature: 0.7
            }
        });

        const text = response.data.choices[0].message.content;

        if (!global.openAIUsing[senderID] || !Array.isArray(global.openAIUsing[senderID]))
            global.openAIUsing[senderID] = [];

        if (global.openAIUsing[senderID].length > 4)
            global.openAIUsing[senderID].shift();

        global.openAIUsing[senderID].push(
            {
                role: 'user',
                content: question
            },
            {
                role: 'assistant',
                content: text
            }
        );

        return text;
    }
    catch (err) {
        throw err;
    }
}

global.askGPT = askGPT;