var request = require("request");const { readdirSync, readFileSync, writeFileSync, existsSync, copySync, createWriteStream, createReadStream } = require("fs-extra");
    module.exports.config = {
        name: "baucua",
        version: "1.0.0",
        hasPermssion: 0,
        credits: "Horizon Lucius Synthesis I",
        description: "Cược bầu cua",
        commandCategory: "Game",
        usages: "baucua + tên + tiền :v",
        cooldowns: 10
    };

    module.exports.onLoad = async function () {
        if (!existsSync(__dirname + '/game/baucua/ga.jpg')) {
            request('https://i.imgur.com/wE5oorQ.jpg').pipe(createWriteStream(__dirname + '/cache/ảnh/ga.jpg'));
        }
        if (!existsSync(__dirname + '/game/baucua/tom.jpg')) {
            request('https://i.imgur.com/6qSQieV.jpg').pipe(createWriteStream(__dirname + '/cache/ảnh/tom.jpg'));
        }
        if (!existsSync(__dirname + '/game/baucua/bau.png')) {
            request('https://i.imgur.com/2R3ld8y.png').pipe(createWriteStream(__dirname + '/cache/ảnh/bau.jpg'));
        }
        if (!existsSync(__dirname + '/game/baucua/cua.jpg')) {
            request('https://i.imgur.com/xCiWutq.jpg').pipe(createWriteStream(__dirname + '/cache/ảnh/cua.jpg'));
        }
        if (!existsSync(__dirname + '/game/baucua/ca.jpg')) {
            request('https://i.imgur.com/59EuhZO.jpg').pipe(createWriteStream(__dirname + '/cache/ảnh/ca.jpg'));
        }
        if (!existsSync(__dirname + '/game/baucua/nai.png')) {
            request('https://i.imgur.com/QllJq1R.png').pipe(createWriteStream(__dirname + '/cache/ảnh/nai.jpg'));
        }
        if (!existsSync(__dirname + '/game/baucua/baucua.gif')) {
            request('https://i.imgur.com/65nD03z.gif').pipe(createWriteStream(__dirname + '/cache/ảnh/baucua.gif'));
        }
    };

    async function get(one,two,three) {
        var x1;
            switch (one) {
                case "ga": x1 = "🐓";
                    break;
                case "tom": x1 = '🦞';
                    break;
                case "bau": x1 = '🍐';
                    break;
                case "cua": x1 = '🦀';
                    break;
                case "ca": x1 = '🐟';
                    break;
                case "nai":x1 = '🦌';
            }
        var x2;
            switch (two) {
                case "ga": x2 = "🐓";
                    break;
                case "tom": x2 = '🦞';
                    break;
                case "bau": x2 = '🍐';
                    break;
                case "cua": x2 = '🦀';
                    break;
                case "ca": x2 = '🐟';
                    break;
                case "nai": x2 = '🦌';
            }
        var x3;
            switch (three) {
                case "ga": x3 = "🐓";
                    break;
                case "tom": x3 = '🦞';
                    break;
                case "bau": x3 = '🍐';
                    break;
                case "cua": x3 = '🦀';
                    break;
                case "ca": x3 = '🐟';
                    break;
                case "nai":x3 = '🦌';
            }
        var all = [x1, x2, x3];
    return full = all;
    }
var full = [];
    module.exports.run = async function({ api, event, args, Currencies }) { var out = (msg) => api.sendMessage(msg,event.threadID, event.messageID);
        const slotItems = ["ga", "tom", "bau", "cua", "ca", "nai"];
            const moneyUser = (await Currencies.getData(event.senderID)).money;
                var moneyBet = parseInt(args[1]);
                    if (!args[0] || !isNaN(args[0])) return api.sendMessage("lekhanh => Hãy Bấm : /baucua [bầu/cua/cá/nai/gà/tôm] [số tiền]",event.threadID, event.messageID);
                    if (isNaN(moneyBet) || moneyBet <= 0) return api.sendMessage("lekhanh => Số tiền đặt cược không được để trống hoặc là số tiền âm", event.threadID, event.messageID);
                if (moneyBet > moneyUser) return api.sendMessage("lekhanh => Số tiền bạn đặt lớn hơn số dư của bạn!", event.threadID, event.messageID);
            if (moneyBet < 100) return api.sendMessage("lekhanh => Số tiền đặt không được dưới 100 đô!", event.threadID, event.messageID);
        var number = [], win = false;
    for (let i = 0; i < 3; i++) number[i] = slotItems[Math.floor(Math.random() * slotItems.length)];
        var itemm;
            var icon;
                switch (args[0]) {
                    case "bầu":
                        case "Bầu": itemm = "bau";
                                icon = '🍐';
                            break;
                    case "cua": 
                        case "Cua": itemm = "cua";
                                icon = '🦀';
                            break;
                    case "cá":
                        case "Cá": itemm = "ca";
                                icon = '🐟';
                            break;
                    case "nai":
                        case "Nai": itemm = "nai";
                                icon = '🦌';
                            break;
                    case "gà": 
                        case "Gà": itemm = "ga";
                                icon = '🐓';
                            break;
                    case "tôm":
                        case "Tôm": itemm = "tom";
                                icon = '🦞';
                            break;
                                default: return api.sendMessage("[Lemon Bot] => Hãy Bấm : /baucua [bầu/cua/cá/nai/gà/tôm] [số tiền]",event.threadID, event.messageID);
                }      
                await get(number[0],number[1],number[2]);
            api.sendMessage({body:"🌺 Bot đang sóc lọ, vui lòng chờ...💝",attachment: createReadStream(__dirname + "/cache/ảnh/baucua.gif")},event.threadID,async (error,info) => {
                await new Promise(resolve => setTimeout(resolve, 5 * 1000));
                    api.unsendMessage(info.messageID);
                          await new Promise(resolve => setTimeout(resolve, 100));
    var array = [number[0],number[1],number[2]];
        var listimg = [];
           for (let string of array) {
               listimg.push(createReadStream(__dirname + `/cache/ảnh/${string}.jpg`));
           }
        if (array.includes(itemm)) {
            var i = 0;
                if (array[0] == itemm) i+=1;
                    if (array[1] == itemm) i+=1;
                if (array[2] == itemm) i+=1;
            if (i == 1) {
                var mon = parseInt(args[1]) * 2;  
                    await Currencies.increaseMoney(event.senderID, mon); console.log("s1")
                        return api.sendMessage({body:`== [ 𝗞𝗘̂́𝗧 𝗤𝗨𝗔̉ 𝗕𝗔̂̀𝗨 𝗖𝗨𝗔 ] ==\n━━━━━━━━━━━━━\n➢ 𝐋𝐚̆́𝐜 𝐓𝐫𝐮́𝐧𝐠:「${full.join(" | ")}」\n🌺 𝐁𝐚̣𝐧 𝐓𝐡𝐚̆́𝐧𝐠 𝐋𝐨̛́𝐧 𝐕𝐚̀ 𝐍𝐡𝐚̣̂𝐧 𝐕𝐞̂̀ 𝐒𝐨̂́ 𝐓𝐢𝐞̂̀𝐧 ${mon} 𝐕𝐍𝐃 💵\n𝐕𝐢̀ 𝐁𝐨𝐭 𝐋𝐚̆́𝐜 𝐂𝐨́ 𝟏 ${icon} `,attachment: listimg},event.threadID, event.messageID);
            }
            else if (i == 2) {
                var mon = parseInt(args[1]) * 4; 
                    await Currencies.increaseMoney(event.senderID, mon); console.log("s2")
                        return api.sendMessage({body:`== [ 𝗞𝗘̂́𝗧 𝗤𝗨𝗔̉ 𝗕𝗔̂̀𝗨 𝗖𝗨𝗔 ] ==\n━━━━━━━━━━━━━\n➢ 𝐋𝐚̆́𝐜 𝐓𝐫𝐮́𝐧𝐠:「${full.join(" | ")}」\n🌺 𝐁𝐚̣𝐧 𝐓𝐡𝐚̆́𝐧𝐠 𝐋𝐨̛́𝐧 𝐕𝐚̀ 𝐍𝐡𝐚̣̂𝐧 𝐕𝐞̂̀ 𝐒𝐨̂́ 𝐓𝐢𝐞̂̀𝐧 ${mon} 𝐕𝐍𝐃 💵\n𝐕𝐢̀ 𝐁𝐨𝐭 𝐋𝐚̆́𝐜 𝐂𝐨́ 𝟐 ${icon} `,attachment: listimg},event.threadID, event.messageID);
            }
            else if (i == 3) {
                var mon = parseInt(args[1]) * 6; 
                    await Currencies.increaseMoney(event.senderID, mon); console.log('s3')
                        return api.sendMessage({body:`== [ 𝗞𝗘̂́𝗧 𝗤𝗨𝗔̉ 𝗕𝗔̂̀𝗨 𝗖𝗨𝗔 ] ==\n━━━━━━━━━━━━━\n➢ 𝐋𝐚̆́𝐜 𝐓𝐫𝐮́𝐧𝐠:「${full.join(" | ")}」\n🌺 𝐁𝐚̣𝐧 𝐓𝐡𝐚̆́𝐧𝐠 𝐋𝐨̛́𝐧 𝐕𝐚̀ 𝐍𝐡𝐚̣̂𝐧 𝐕𝐞̂̀ 𝐒𝐨̂́ 𝐓𝐢𝐞̂̀𝐧 ${mon} 𝐕𝐍𝐃 💵\n𝐕𝐢̀ 𝐁𝐨𝐭 𝐋𝐚̆́𝐜 𝐂𝐨́ 𝟑 ${icon} `,attachment: listimg},event.threadID, event.messageID);
            }
            else return api.sendMessage("[Lemon Bot] => Lỗi ! Code : XX1N",event.threadID,event.messageID);
        } else  {
            await Currencies.decreaseMoney(event.senderID, parseInt(args[1])); console.log('s4')
            return api.sendMessage({body:`== [ 𝗞𝗘̂́𝗧 𝗤𝗨𝗔̉ 𝗕𝗔̂̀𝗨 𝗖𝗨𝗔 ] ==\n━━━━━━━━━━━━━\n➢ 𝐋𝐚̆́𝐜 𝐓𝐫𝐮́𝐧𝐠: 「${full.join(" | ")}」\n🌺 𝐁𝐚̣𝐧 𝐓𝐡𝐮𝐚 𝐑𝐨̂̀𝐢 𝐕𝐚̀ 𝐁𝐢̣ 𝐓𝐫𝐮̛̀ ${args[1]} 𝐕𝐍𝐃 💸\n𝐕𝐢̀ 𝐁𝐨𝐭 𝐋𝐚̆́𝐜 𝐊𝐡𝐨̂𝐧𝐠 𝐂𝐨́ ${icon} `,attachment: listimg},event.threadID, event.messageID);
        }
            } ,event.messageID);
    };