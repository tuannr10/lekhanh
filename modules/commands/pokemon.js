module.exports.config = {
    name: "pokemon",
    version: "1.0.4",
    hasPermssion: 0,
    credits: "D-Jukie",//được mod lại chữ bởi ACERRRS ANGELERS
    description: "Nuôi pokemon, chiến đấu tăng lực chiến!",
    commandCategory: "Game",
    usages: "[]",
    cooldowns: 0,
    dependencies: {
        "gifencoder": ""
    },
    envConfig: {
        APIKEY: ""
    }
};

module.exports.onLoad = async () => {
    const fs = require("fs-extra");
    const axios = require("axios");

    const dir = __dirname + `/pokemon/`;
    const dirimg = __dirname + `/pokemon/cache/`;
    const dirData = __dirname + `/pokemon/datauser/`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, {
        recursive: true
    });
    if (!fs.existsSync(dirData)) fs.mkdirSync(dirData, {
        recursive: true
    });
    if (!fs.existsSync(dirimg)) fs.mkdirSync(dirimg, {
        recursive: true
    });

    if (!fs.existsSync(dir + "pokemon.json")) (await axios({
        url: "https://raw.githubusercontent.com/J-JRT/api2/mainV2/datapokemon.json",
        method: 'GET',
        responseType: 'stream'
    })).data.pipe(fs.createWriteStream(dir + "pokemon.json"));
    return;
}

module.exports.handleEvent = async function({ api, event, Currencies }) {
    const { threadID, messageID, body, senderID } = event;
    if (!body) return;
    if(!global.pokemon) return
        const gameThread = global.pokemon.get(threadID) || {};
    if (!gameThread) return;
    if(gameThread.start != true) return;
    if (!gameThread.player.find(i => i.userID == senderID)) return;
    var s, q;
    var s = gameThread.player.findIndex(i => i.userID == senderID);
    var q = gameThread.player[s];
    if(body.toLowerCase() == 'my pokemon') {
        const user = require('./pokemon/datauser/' + `${senderID}.json`);
        if (q.choose.status == true) return api.sendMessage('⚠ 𝐁𝐚̣𝐧 đ𝐚̃ 𝐜𝐡𝐨̣𝐧 𝐫𝐨̂̀𝐢 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐜𝐡𝐨̣𝐧 𝐥𝐚̣𝐢!', threadID, messageID);
        var msg = `🔍𝐒𝐨̂́ 𝐩𝐨𝐤𝐞𝐦𝐨𝐧 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́ ${user.pet.length}\n`
        var ii = 0;
        for (let i of user.pet) {
            msg += `[${++ii}]. ${i.name} - ${i.coins}$\n🐳𝐓𝐲𝐩𝐞: ${i.type}\n🧡𝐇𝐏: ${i.HP}\n🗡𝐀𝐭𝐭𝐚𝐜𝐤: ${i.Attack}\n🛡𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${i.Defense}\n⚡️𝐒𝐩𝐞𝐞𝐝: ${i.Speed}\n📌𝐒𝐤𝐢𝐥𝐥: ${i.skill.join(', ')}\n\n`
        }
        msg += '𝐍𝐡𝐨̛́ 𝐬𝐨̂́ 𝐭𝐡𝐮̛́ 𝐭𝐮̛̣ 𝐜𝐮̉𝐚 𝐩𝐨𝐤𝐞𝐦𝐨𝐧 𝐛𝐚̣𝐧 đ𝐚̃ 𝐜𝐡𝐨̣𝐧!'
        api.sendMessage(msg, senderID)
        return api.sendMessage('𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐫𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐯𝐨̛́𝐢 𝐬𝐨̂́ 𝐭𝐡𝐮̛́ 𝐭𝐮̛̣ 𝐩𝐨𝐤𝐞𝐦𝐨𝐧 𝐭𝐮̛𝐨̛𝐧𝐠 𝐮̛́𝐧𝐠 𝐭𝐫𝐨𝐧𝐠 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐯𝐨̛́𝐢 𝐛𝐨𝐭!', threadID, (error, info) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: "playerSolo",
                pet: user.pet
            })
        }, messageID);
    }
}
module.exports.run = async ({ api, event, args, Users }) => {
    const { threadID, messageID, senderID } = event;
    const { readFileSync, writeFileSync, existsSync, createReadStream } = require("fs-extra")
    const pathA = require("path");
    const axios = require("axios")
    const path = pathA.join(__dirname, 'pokemon', 'datauser', `${senderID}.json`);
    switch (args[0]) {
        case "register":
        case "-r": { 
            if (!existsSync(path)) {
                const obj = {};
                obj.name = (await Users.getData(senderID)).name;
                obj.ID = senderID;
                obj.pet = [];
                obj.foods = [];
                obj.solo = {}
                obj.solo.win = 0
                obj.solo.lose = 0
                obj.solo.draw = 0
                writeFileSync(path, JSON.stringify(obj, null, 4));
                return api.sendMessage("========[𝐏𝐎𝐊𝐄𝐌𝐎𝐍]========\n⚔️Đ𝐚̆𝐧𝐠 𝐤𝐢́ 𝐧𝐮𝐨̂𝐢 𝐩𝐨𝐤𝐞𝐦𝐨𝐧 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠⚔️", threadID, messageID);
            }
            else return api.sendMessage("========[𝐏𝐎𝐊𝐄𝐌𝐎𝐍]========\n⚔️𝐁𝐚̣𝐧 đ𝐚̃ 𝐜𝐨́ 𝐭𝐫𝐨𝐧𝐠 𝐜𝐨̛ 𝐬𝐨̛̉ 𝐝𝐮̛̃ 𝐥𝐢𝐞̣̂𝐮⚔️", threadID, messageID);
            break;
        }
        case 'info':
        case '-i': {
            if (!existsSync(path)) { return api.sendMessage('🔍𝐁𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 đ𝐚̆𝐧𝐠 𝐤𝐢́ 𝐧𝐮𝐨̂𝐢 𝐩𝐨𝐤𝐞𝐦𝐨𝐧!', threadID, messageID); }
            const pathPoke = require("./pokemon/datauser/" + senderID + '.json');
            var name = pathPoke.name,
                ID = pathPoke.ID,
                pet = pathPoke.pet.length,
                foods = pathPoke.foods.length,
                win = pathPoke.solo.win,
                lose = pathPoke.solo.lose
            return api.sendMessage(`👤𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐧𝐮𝐨̂𝐢 𝐩𝐨𝐤𝐞𝐦𝐨𝐧: ${name}\n🔍ID: ${ID}\n⏳𝐒𝐨̂́ 𝐩𝐨𝐤𝐞𝐦𝐨𝐧: ${pet}\n🛍𝐓𝐮́𝐢 𝐭𝐡𝐮̛́𝐜 𝐚̆𝐧: ${foods}\n✅𝐒𝐨̂́ 𝐭𝐫𝐚̣̂𝐧 𝐭𝐡𝐚̆́𝐧𝐠: ${win}\n❎𝐒𝐨̂́ 𝐭𝐫𝐚̣̂𝐧 𝐭𝐡𝐮𝐚: ${lose}\n\n👉𝐓𝐡𝐚̉ 𝐜𝐚̉𝐦 𝐱𝐮́𝐜 '👍' 𝐯𝐚̀𝐨 đ𝐞̂̉ 𝐱𝐞𝐦 𝐩𝐨𝐤𝐞𝐦𝐨𝐧 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́`, threadID, (error, info) => {
                global.client.handleReaction.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "infoPoke",
                })
            }, messageID);
        }
        case 'shop':
        case '-s': {
            if (!existsSync(path)) { return api.sendMessage('🔍𝐁𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 đ𝐚̆𝐧𝐠 𝐤𝐢́ 𝐧𝐮𝐨̂𝐢 𝐩𝐨𝐤𝐞𝐦𝐨𝐧!', threadID, messageID); }
            const pathPoke = require("./pokemon/pokemon.json");
            return api.sendMessage("========[𝐏𝐎𝐊𝐄𝐌𝐎𝐍]========\n👉 𝟏/ 𝐌𝐮𝐚 𝐭𝐡𝐮̛́𝐜 𝐚̆𝐧 𝐜𝐡𝐨 𝐩𝐨𝐤𝐞𝐦𝐨𝐧\n👉 𝟐/ 𝐁𝐚́𝐧 𝐩𝐨𝐤𝐞𝐦𝐨𝐧\n👉 𝟑/ 𝐂𝐮̛𝐨̛̀𝐧𝐠 𝐡𝐨́𝐚 𝐬𝐮̛́𝐜 𝐦𝐚̣𝐧𝐡 (𝐛𝐨̉ 𝐫𝐚 𝟕𝟎𝟎𝟎𝟎$ 𝐬𝐨̂́ 𝐭𝐢𝐞̂̀𝐧 đ𝐞̂̉ 𝐭𝐚̆𝐧𝐠 𝟒𝟎% 𝐬𝐮̛́𝐜 𝐦𝐚̣𝐧𝐡 𝐜𝐡𝐨 𝟏 𝐩𝐨𝐤𝐞𝐦𝐨𝐧\n👉 𝟒/ 𝐌𝐮𝐚 𝐫𝐮̛𝐨̛𝐧𝐠 𝐡𝐞𝐱𝐭𝐞𝐜𝐡 𝐫𝐚 𝐧𝐠𝐚̂̃𝐮 𝐧𝐡𝐢𝐞̂𝐧 𝟏 𝐩𝐨𝐤𝐞𝐦𝐨𝐧\n🧐𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐯𝐨̛́𝐢 𝐥𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧", threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "shop",
                    path: pathPoke
                })
            }, messageID);
        }
        case 'list':
        case '-l': {
            if (!existsSync(path)) { return api.sendMessage('🔍𝐁𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 đ𝐚̆𝐧𝐠 𝐤𝐢́ 𝐧𝐮𝐨̂𝐢 𝐩𝐨𝐤𝐞𝐦𝐨𝐧!', threadID, messageID); }
            const listPoke = require("./pokemon/pokemon.json");
            var list = [], index = 0;
            for (let i of listPoke) {
                index++
                var msg = `🔍ID: ${index}\n🕵️‍♀️𝐍𝐚𝐦𝐞𝐏𝐨𝐤𝐞: ${i.name} - ${i.coins}$\n🧡𝐇𝐏: ${i.power.HP}\n🗡𝐀𝐭𝐭𝐚𝐜𝐤: ${i.power.Attack}\n🛡𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${i.power.Defense}\n⚡️𝐒𝐩𝐞𝐞𝐝: ${i.power.Speed}\n\n`;
                list.push(msg)
            }
            var page = 1;
            page = parseInt(args[1]) || 1;
            page < -1 ? page = 1 : "";
            var limit = 15;
            var data = "====𝐃𝐀𝐍𝐇 𝐒𝐀́𝐂𝐇 𝐏𝐎𝐊𝐄𝐌𝐎𝐍===\n\n";
            var numPage = Math.ceil(list.length / limit);
              for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
                if (i >= list.length) break;
                  let poke = list[i];                  
                  data += poke;
              }
            data += `\n» 𝐓𝐫𝐚𝐧𝐠 ${page}/${numPage}--\n» 𝐃𝐮̀𝐧𝐠 ->${this.config.name} số trang`
            data += `\n» 𝐑𝐞𝐩𝐥𝐲 𝐈𝐃 đ𝐞̂̉ 𝐱𝐞𝐦 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐜𝐡𝐢 𝐭𝐢𝐞̂́𝐭 𝐯𝐞̂̀ 𝐩𝐨𝐤𝐞𝐦𝐨𝐧\n`
            return api.sendMessage(data, threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "pokemon",
                })
            }, messageID);
        }
        case 'bag': 
        case '-b': {
            if (!existsSync(path)) { return api.sendMessage('🔍𝐁𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 đ𝐚̆𝐧𝐠 𝐤𝐢́ 𝐧𝐮𝐨̂𝐢 𝐩𝐨𝐤𝐞𝐦𝐨𝐧!', threadID, messageID); }
            const user = require('./pokemon/datauser/' + `${senderID}.json`);
            var msg = `🔍𝐒𝐨̂́ 𝐩𝐨𝐤𝐞𝐦𝐨𝐧 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́ ${user.pet.length}\n`
            var ii = 0;
            var iii = 0;
            for (let i of user.pet) {
                msg += `[${++ii}]. ${i.name} - ${i.coins}$\n🐳𝐓𝐲𝐩𝐞: ${i.type}\n🧡𝐇𝐏: ${i.HP}\n🗡𝐀𝐭𝐭𝐚𝐜𝐤: ${i.Attack}\n🛡𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${i.Defense}\n⚡️𝐒𝐩𝐞𝐞𝐝: ${i.Speed}\n\n`
            }
            msg += '👉𝐒𝐨̂́ 𝐭𝐡𝐮̛́𝐜 𝐚̆𝐧 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́: ' + user.foods.length + '\n'
            for (let i of user.foods) {
                msg += `[${++iii}]. ${i.name}\n🧡𝐇𝐏: ${i.HP}\n🗡𝐀𝐭𝐭𝐚𝐜𝐤: ${i.Attack}\n🛡𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${i.Defense}\n⚡️𝐒𝐩𝐞𝐞𝐝: ${i.Speed}\n🐳𝐓𝐲𝐩𝐞: ${i.type}\n\n`
            }
            msg += '𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐛𝐚̆̀𝐧𝐠 𝐜𝐚́𝐜𝐡 𝐧𝐨̂́𝐢 𝟐 𝐬𝐨̂́ 𝐭𝐡𝐮̛́ 𝐭𝐮̛̣: 𝐩𝐨𝐤𝐞𝐦𝐨𝐧 + 𝐭𝐡𝐮̛́𝐜 𝐚̆𝐧 đ𝐞̂̉ 𝐜𝐡𝐨 𝐩𝐨𝐤𝐞𝐦𝐨𝐧 𝐚̆𝐧 (𝐜𝐮̀𝐧𝐠 𝐡𝐞̣̂ đ𝐮̛𝐨̛̣𝐜 𝐭𝐚̆𝐧𝐠 𝟏𝟑𝟎% 𝐬𝐮̛́𝐜 𝐦𝐚̣𝐧𝐡)'
            return api.sendMessage(msg, threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "petFoods",
                    pet: user.pet,
                    food: user.foods
                })
            }, messageID);
        }
        case 'search':
        case 'find':
        case '-f': {
            const stringSimilarity = require('string-similarity');
            var listPoke = require("./pokemon/pokemon.json");
            var msg = [], image = [];
            for (let id of listPoke) { 
                msg.push(id.name)
            } 
            var s = args.join(" ").slice(parseInt(args[0].length))         
            var checker = stringSimilarity.findBestMatch(s, msg)
            if (checker.bestMatch.rating >= 1) { var search = checker.bestMatch.target }
            var s = checker.bestMatch.target
            var findPoke = listPoke.find(c => c.name == s)
            let pokemon = (await axios.get(findPoke.images, { responseType: "arraybuffer" } )).data;
            writeFileSync( __dirname + "/pokemon/cache/pokemonfind.png", Buffer.from(pokemon, "utf-8") );
            image.push(createReadStream(__dirname + "/pokemon/cache/pokemonfind.png"));
            var message = {body: `🔍𝐓𝐢̀𝐦 𝐤𝐢𝐞̂́𝐦:\n🕵️‍♀️𝐍𝐚𝐦𝐞: ${findPoke.name}\n🔍𝐈𝐃: ${findPoke.ID + 1}\n🐳𝐓𝐲𝐩𝐞: ${findPoke.type}\n🧡𝐇𝐏: ${findPoke.power.HP}\n🗡𝐀𝐭𝐭𝐚𝐜𝐤: ${findPoke.power.Attack}\n🛡𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${findPoke.power.Defense}\n⚡️𝐒𝐩𝐞𝐞𝐝: ${findPoke.power.Speed}\n💰𝐂𝐨𝐢𝐧𝐬: ${findPoke.coins}$\n💬Mô tả: ${findPoke.description}\n👉𝐓𝐡𝐚̉ 𝐜𝐚̉𝐦 𝐱𝐮́𝐜 '👍' 𝐯𝐚̀𝐨 đ𝐞̂̉ 𝐦𝐮𝐚 𝐩𝐨𝐤𝐞𝐦𝐨𝐧 𝐧𝐚̀𝐲!`, attachment: image};
            return api.sendMessage(message, threadID, (error, info) => {
                global.client.handleReaction.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: 'buyPokemon',
                    ID: findPoke.ID
                })
            }, messageID);
        }
        case 'solo': {
            if (!existsSync(path)) { return api.sendMessage('🔍𝐁𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 đ𝐚̆𝐧𝐠 𝐤𝐢́ 𝐧𝐮𝐨̂𝐢 𝐩𝐨𝐤𝐞𝐦𝐨𝐧!', threadID, messageID); }
            const user = require('./pokemon/datauser/' + `${senderID}.json`);
            if(user.pet.length == 0) return api.sendMessage('🔍𝐁𝐚̣𝐧 𝐜𝐨́ 𝟎 𝐩𝐨𝐤𝐞𝐦𝐨𝐧 𝐧𝐞̂𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐭𝐡𝐚𝐦 𝐠𝐢𝐚!', threadID, messageID)
            if (!global.pokemon) global.pokemon = new Map();
            var gameThread = global.pokemon.get(threadID);
            switch (args[1]) {
                case 'create':
                case '-c': {
                    if (global.pokemon.has(threadID)) return api.sendMessage('⚠ 𝐍𝐡𝐨́𝐦 𝐛𝐚̣𝐧 đ𝐚𝐧𝐠 𝐜𝐨́ 𝐦𝐚𝐩 𝐬𝐨𝐥𝐨 𝐤𝐡𝐚́𝐜 𝐧𝐞̂𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐭𝐚̣𝐨 𝐭𝐡𝐞̂𝐦, 𝐯𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐡𝐮̉𝐲 𝐦𝐚𝐩 𝐭𝐫𝐮̛𝐨̛́𝐜 đ𝐨́!', threadID, messageID);
                    var name = await Users.getNameUser(senderID);
                    global.pokemon.set(threadID, { box: threadID, start: false, author: senderID, number: 0, player: [{ name, userID: senderID, choose: { status: false, msg: null } }] });
                    return api.sendMessage('🎉𝐓𝐚̣𝐨 𝐦𝐚𝐩 đ𝐚̂́𝐮 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠, 𝐛𝐚̆́𝐭 đ𝐚̂̀𝐮 𝐤𝐡𝐢 𝐜𝐨́ 𝟐 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐭𝐡𝐚𝐦 𝐠𝐢𝐚\n👤𝟏/𝟐 𝐩𝐥𝐚𝐲𝐞𝐫\n👉𝐉𝐨𝐢𝐧: 𝐩𝐨𝐤𝐞𝐦𝐨𝐧 𝐬𝐨𝐥𝐨 𝐣𝐨𝐢𝐧/-𝐣', threadID, messageID);
                } 
                case 'join':
                case '-j': {
                    if (!global.pokemon.has(threadID)) return api.sendMessage('⚠ 𝐍𝐡𝐨́𝐦 𝐧𝐚̀𝐲 𝐡𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐜𝐡𝐮̛𝐚 𝐜𝐨́ 𝐦𝐚𝐩 đ𝐚̂́𝐮 𝐧𝐚̀𝐨, 𝐯𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐭𝐚̣𝐨 đ𝐞̂̉ 𝐭𝐡𝐚𝐦 𝐠𝐢𝐚!', threadID, messageID);
                    if (gameThread.start == true) return api.sendMessage('⚠ 𝐌𝐚𝐩 đ𝐚̂́𝐮 𝐨̛̉ 𝐧𝐡𝐨́𝐦 𝐧𝐚̀𝐲 đ𝐚̃ 𝐛𝐚̆́𝐭 đ𝐚̂̀𝐮!', threadID, messageID);
                    if (gameThread.player.find(i => i.userID == senderID)) return api.sendMessage('⚠ Bạn đã tham gia trước đó!', threadID, messageID);
                    var name = await Users.getNameUser(senderID);
                    gameThread.player.push({ name, userID: senderID, choose: { status: false, msg: null } });
                    if(gameThread.player.length > 2) return api.sendMessage('⚠Số người tham gia vào map này đã đủ!', threadID, messageID);
                    gameThread.start = true;
                    global.pokemon.set(threadID, gameThread);
                    api.sendMessage('🎉𝐓𝐡𝐚𝐦 𝐠𝐢𝐚 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠.\n👤𝟐/𝟐 𝐩𝐥𝐚𝐲𝐞𝐫\n🔥𝐁𝐚̆́𝐭 đ𝐚̂̀𝐮 𝐬𝐚𝐮 𝟓𝐬', threadID, messageID);
                    setTimeout(() => { return api.sendMessage('👉𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐧𝐡𝐚̣̂𝐩 "𝐦𝐲 𝐩𝐨𝐤𝐞𝐦𝐨𝐧" đ𝐞̂̉ 𝐜𝐡𝐨̣𝐧 𝐩𝐨𝐤𝐞𝐦𝐨𝐧 𝐜𝐡𝐢𝐞̂́𝐧 đ𝐚̂́𝐮!', threadID, messageID)}, 5000);
                    return
                }
                case "end":
                case "end":
                case "-e": {
                    if (!gameThread) return api.sendMessage('⚠ 𝐍𝐡𝐨́𝐦 𝐧𝐚̀𝐲 𝐡𝐢𝐞̣̂𝐧 𝐭𝐚̣𝐢 𝐜𝐡𝐮̛𝐚 𝐜𝐨́ 𝐦𝐚𝐩 đ𝐚̂́𝐮 𝐧𝐚̀𝐨 đ𝐞̂̉ 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐡𝐮̉𝐲!', threadID, messageID);
                    if (gameThread.author != senderID) return api.sendMessage('⚠ 𝐁𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐡𝐮̉𝐲 𝐦𝐚𝐩 đ𝐚̂́𝐮 𝐝𝐨 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐤𝐡𝐚́𝐜 𝐭𝐚̣𝐨 𝐫𝐚!', threadID, messageID);
                    global.pokemon.delete(threadID);
                    return api.sendMessage('🎉Đã xóa map đấu!', threadID, messageID); 
                }
                default: {
                    return api.sendMessage('[====Đ𝐀̂́𝐔 𝐓𝐑𝐔̛𝐎̛̀𝐍𝐆 𝐏𝐎𝐊𝐄𝐌𝐎𝐍===]\n👉𝐓𝐚̣𝐨 𝐭𝐫𝐚̣̂𝐧 đ𝐚̂́𝐮: 𝐜𝐫𝐞𝐚𝐭𝐞/-𝐜\n👉𝐓𝐡𝐚𝐦 𝐠𝐢𝐚: 𝐣𝐨𝐢𝐧/-𝐣\n👉𝐊𝐞̂́𝐭 𝐭𝐡𝐮́𝐜 𝐭𝐫𝐚̣̂𝐧: 𝐞𝐧𝐝/-𝐞', threadID, messageID);
                }
            }
        }
        case 'support': {
            return api.sendMessage('[====𝐒𝐔𝐏𝐏𝐎𝐑𝐓===]\n𝟏. 𝐋𝐢𝐞̂𝐧 𝐡𝐞̣̂ 𝐦𝐮𝐚 𝐀𝐏𝐈𝐊𝐄𝐘!\n𝟐. Đ𝐨́𝐧𝐠 𝐠𝐨́𝐩 𝐲́ 𝐭𝐮̛𝐨̛̉𝐧𝐠, 𝐲𝐞̂𝐮 𝐜𝐚̂̀𝐮 𝐭𝐢́𝐧𝐡 𝐧𝐚̆𝐧𝐠!\n𝟑. 𝐍𝐡𝐚̣̂𝐧 𝐆𝐈𝐅𝐂𝐎𝐃𝐄\n𝟒. 𝐍𝐡𝐚̣̂𝐩 𝐆𝐈𝐅𝐓𝐂𝐎𝐃𝐄', threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "spadmin"
                })
            }, messageID);
        }
        default: {
	const fs = require('fs-extra');
	const img1 = ["https://i.imgur.com/dewWfLC.jpg"]
	var path1 = __dirname + "/cache/pokemon.jpg"
	var rdimg1 = img1[Math.floor(Math.random() * img1.length)]; 
	const imgP1 = []
	let dowloadIMG1 = (await axios.get(rdimg1, { responseType: "arraybuffer" } )).data; 
	fs.writeFileSync(path1, Buffer.from(dowloadIMG1, "utf-8") );
	imgP1.push(fs.createReadStream(path1))
  var msg1 = '[====[𝐏𝐎𝐊𝐄𝐌𝐎𝐍]====]\n👉Đ𝐚̆𝐧𝐠 𝐤𝐢́: 𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫/-𝐫\n👉𝐋𝐢𝐬𝐭 𝐩𝐨𝐤𝐞𝐦𝐨𝐧: 𝐥𝐢𝐬𝐭/-𝐥\n👉𝐈𝐧𝐟𝐨 𝐮𝐬𝐞𝐫: 𝐢𝐧𝐟𝐨/-𝐢\n👉𝐂𝐮̛̉𝐚 𝐡𝐚̀𝐧𝐠: 𝐬𝐡𝐨𝐩/-𝐬\n👉𝐁𝐚 𝐥𝐨̂: 𝐛𝐚𝐠/-𝐛\n👉𝐓𝐢̀𝐦 𝐤𝐢𝐞̂́𝐦: 𝐬𝐞𝐚𝐫𝐜𝐡/𝐟𝐢𝐧𝐝/-𝐟\n👉Đ𝐚̂́𝐮 𝐭𝐫𝐮̛𝐨̛̀𝐧𝐠: 𝐬𝐨𝐥𝐨 -𝐜/-𝐣/-𝐞\n👉𝐇𝐨̂̃ 𝐭𝐫𝐨̛̣, 𝐠𝐢𝐟𝐭𝐜𝐨𝐝𝐞: 𝐬𝐮𝐩𝐩𝐨𝐫𝐭'
	var msgg1 = {body: msg1, attachment: imgP1}   
            return api.sendMessage(msgg1, threadID, messageID)
        };
    }
}
module.exports.handleReply = async ({ event, api, Currencies, handleReply, Users }) => {
    if (String(event.senderID) !== String(handleReply.author)) return;
    const { body, threadID, messageID, senderID } = event;
    const axios = require("axios")
    const { readFileSync, writeFileSync, existsSync, createReadStream, unlinkSync, writeFile } = require("fs-extra")
    switch (handleReply.type) {
        case 'spadmin': {
            switch (body) {
                case '1':
                case '2': {
                    api.unsendMessage(handleReply.messageID)
                    return api.sendMessage('👉𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐫𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐤𝐞̀𝐦 𝐧𝐨̣̂𝐢 𝐝𝐮𝐧𝐠 đ𝐞̂̉ 𝐠𝐮̛̉𝐢 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐭𝐨̛́𝐢 𝐚𝐝𝐦𝐢𝐧 𝐠𝐚𝐦𝐞!', threadID, (error, info) => {
                        global.client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: "message"
                        })
                    }, messageID);
                }
                case '3': {
                    var res = await axios.get(`https://apipokemon-1.sdwdewhgdjwwdjs.repl.co/giftcode?type=get`);
                    if(res.data.msg == false) return api.sendMessage('Hôm nay không có GIFTCODE', threadID, messageID);
                    return api.sendMessage('👉𝐆𝐈𝐅𝐓𝐂𝐎𝐃𝐄 𝐓𝐀̂𝐍 𝐓𝐇𝐔̉!:\n' + res.data.msg, threadID, messageID);
                }
                case '4': {
                    api.unsendMessage(handleReply.messageID)
                    return api.sendMessage('👉𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐫𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐯𝐨̛́𝐢 𝐧𝐨̣̂𝐢 𝐝𝐮𝐧𝐠 𝐥𝐚̀ 𝐆𝐈𝐅𝐓𝐂𝐎𝐃𝐄 𝐛𝐚̣𝐧 𝐧𝐡𝐚̣̂𝐧 đ𝐮̛𝐨̛̣𝐜 𝐭𝐮̛̀ 𝐚𝐝𝐦𝐢𝐧!', threadID, (error, info) => {
                        global.client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: "giftcode"
                        })
                    }, messageID);
                }
            }
        }
        case 'message': {
            var res = await axios.get(`https://apipokemon-1.sdwdewhgdjwwdjs.repl.co/message?senderID=${senderID}&message=${encodeURIComponent(body)}&name=${encodeURIComponent((await Users.getData(senderID)).name)}`);
            api.unsendMessage(handleReply.messageID)
            if(res.data.msg != true) return api.sendMessage('💬𝐆𝐮̛̉𝐢 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 đ𝐞̂́𝐧 𝐚𝐝𝐦𝐢𝐧 𝐠𝐚𝐦𝐞 𝐭𝐡𝐚̂́𝐭 𝐛𝐚̣𝐢!', threadID, messageID);
            return api.sendMessage('💬𝐆𝐮̛̉𝐢 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 đ𝐞̂́𝐧 𝐚𝐝𝐦𝐢𝐧 𝐠𝐚𝐦𝐞 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠!', threadID, messageID);
        }
        case 'giftcode': {
            var res = await axios.get(`https://apipokemon-1.sdwdewhgdjwwdjs.repl.co/giftcode?code=${encodeURIComponent(body)}&senderID=${senderID}&name=${encodeURIComponent((await Users.getData(senderID)).name)}`);
            if(res.data.msg == false) return api.sendMessage('🧡𝐆𝐮̛̉𝐢 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 đ𝐞̂́𝐧 𝐚𝐝𝐦𝐢𝐧 𝐠𝐚𝐦𝐞 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠!!', threadID, messageID);
            if(res.data.msg == 'fail') return api.sendMessage('🧡𝐁𝐚̣𝐧 đ𝐚̃ 𝐧𝐡𝐚̣̂𝐧 𝐫𝐨̂̀𝐢 𝐧𝐞̂𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐧𝐡𝐚̣̂𝐧 𝐭𝐢𝐞̂́𝐩!', threadID, messageID);
            api.unsendMessage(handleReply.messageID)
            const pathA = require("path");
            const path = pathA.join(__dirname, 'pokemon', 'datauser', `${senderID}.json`);
            const user = require('./pokemon/datauser/' + `${senderID}.json`);
            const listPoke = require("./pokemon/pokemon.json");
            var rd = listPoke[Math.floor(Math.random() * listPoke.length)]; 
            var image = [];
            if(user.pet.includes(rd)) {
                return api.sendMessage(`❌𝐁𝐚̣𝐧 𝐦𝐨̛̉ 𝐭𝐫𝐮́𝐧𝐠 ${rd.name} 𝐧𝐡𝐮̛𝐧𝐠 𝐛𝐚̣𝐧 đ𝐚̃ 𝐬𝐨̛̉ 𝐡𝐮̛̃𝐮 𝐫𝐨̂̀𝐢 𝐧𝐞̂𝐧 𝐦𝐚̂́𝐭 𝐜𝐨𝐝𝐞❌`, threadID, messageID);
            }
            user.pet.push({
                name: rd.name,
                type: rd.type,
                HP: rd.power.HP,
                Attack: rd.power.Attack,
                Defense: rd.power.Defense,
                Speed: rd.power.Speed,
                coins: 0,
                images: rd.images
            })
            writeFileSync(path, JSON.stringify(user, null, 2));
            let pokemon = (await axios.get(rd.images, { responseType: "arraybuffer" } )).data;
            writeFileSync( __dirname + "/pokemon/cache/pokemon.png", Buffer.from(pokemon, "utf-8") );
            image.push(createReadStream(__dirname + "/pokemon/cache/pokemon.png"));
            var msg = {body: `🧡𝐆𝐈𝐅𝐓𝐂𝐎𝐃𝐄 𝐓𝐀̂𝐍 𝐓𝐇𝐔̉!\n☑️𝐁𝐚̣𝐧 𝐦𝐨̛̉ 𝐭𝐫𝐮́𝐧𝐠 ${rd.name}.\n𝐓𝐲𝐩𝐞: ${rd.type}\n🔍Chỉ số: \n🧡𝐇𝐏: ${rd.power.HP}\n🗡𝐀𝐭𝐭𝐚𝐜𝐤: ${rd.power.Attack}\n🛡𝐃𝐞𝐟𝐞𝐧𝐬𝐞: ${rd.power.Defense}\n⚡️𝐒𝐩𝐞𝐞𝐝: ${rd.power.Speed}\n💰𝐂𝐨𝐢𝐧𝐬: 0$\n☑️Đ𝐚̃ 𝐭𝐡𝐞̂𝐦 𝐩𝐨𝐤𝐞𝐦𝐨𝐧 𝐯𝐚̀𝐨 𝐤𝐡𝐨 đ𝐨̂̀ 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧!`, attachment: image}
            return api.sendMessage(msg, threadID, messageID);
        }
        case 'pokemon': {
            if (isNaN(body)) return api.sendMessage("========[𝐏𝐎𝐊𝐄𝐌𝐎𝐍]========\n𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐩𝐡𝐚̉𝐢 𝐥𝐚̀ 𝐦𝐨̣̂𝐭 𝐜𝐨𝐧 𝐬𝐨̂́!", threadID, messageID);
            if (parseInt(body) > 809 || parseInt(body) < 1) return api.sendMessage("========[𝐏𝐎𝐊𝐄𝐌𝐎𝐍]========\n𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐨̂̀𝐧 𝐭𝐚̣𝐢!", threadID, messageID);
            var image = [], 
                listPoke = require("./pokemon/pokemon.json"),
                name = '🕵️‍♀️𝐓𝐞̂𝐧: ' + listPoke[parseInt(body) -1].name,
                HP = '🧡𝐌𝐚́𝐮: ' + listPoke[parseInt(body) -1].power.HP,
                Attack = '🗡Tấn công: ' + listPoke[parseInt(body) -1].power.Attack,
                Defense = '🛡𝐏𝐡𝐨̀𝐧𝐠 𝐭𝐡𝐮̉: ' + listPoke[parseInt(body) -1].power.Defense,
                Speed = '⚡️𝐓𝐨̂́𝐜 đ𝐨̣̂: ' + listPoke[parseInt(body) -1].power.Speed,
                description = '💬𝐌𝐨̂ 𝐭𝐚̉: ' + listPoke[parseInt(body) -1].description,
                coins = '💰𝐂𝐨𝐢𝐧𝐬: ' + listPoke[parseInt(body) -1].coins;
            let pokemon = (await axios.get(listPoke[parseInt(body) -1].images, { responseType: "arraybuffer" } )).data;
            writeFileSync( __dirname + "/pokemon/cache/pokemon.png", Buffer.from(pokemon, "utf-8") );
            image.push(createReadStream(__dirname + "/pokemon/cache/pokemon.png"));
            var msg = {body: `${name}\n${HP}\n${Attack}\n${Defense}\n${Speed}\n${description}\n${coins}$\n\n👉Thả cảm xúc '👍' để mua pokemon này!`, attachment: image}
            api.unsendMessage(handleReply.messageID)
            return api.sendMessage(msg, threadID, (error, info) => {
                global.client.handleReaction.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: 'buyPokemon',
                    ID: parseInt(body) -1
                })
            }, messageID);
        }
        case 'shop': {
            if (isNaN(body)) return api.sendMessage("========[POKEMON]========\nLựa chọn của bạn không phải là một con số!", threadID, messageID);
            if (parseInt(body) > 4 || parseInt(body) < 1) return api.sendMessage("========[POKEMON]========\nLựa chọn của bạn không tồn tại!", threadID, messageID);
            api.unsendMessage(handleReply.messageID)
            switch (body) {
                case "1": {
                    return api.sendMessage(`👉Thức ăn dành cho pokemon:\n👉1. Hệ lửa\n👉2. Hệ điện\n👉3. Bình thường\n👉4. Hệ cỏ/sâu\n👉5. Hệ đất/đá\n👉6. Hệ nước\n👉Reply để đưa ra sự lựa chọn của bạn!`, threadID, (error, info) => {
                        global.client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: "choose_type",
                        })
                    }, messageID);
                }
                case "2": {
                    const user = require('./pokemon/datauser/' + `${senderID}.json`);
                    var msg = `🔍Số pokemon hiện có ${user.pet.length}\n`
                    var ii = 0;
                    for (let i of user.pet) {
                        msg += `[${++ii}]. ${i.name} - ${i.coins}$\n🐳Type: ${i.type}\n🧡HP: ${i.HP}\n🗡Attack: ${i.Attack}\n🛡Defense: ${i.Defense}\n⚡️Speed: ${i.Speed}\n\n`
                    }
                    msg += 'Reply tin nhắn này kèm số thứ tự để bán pokemon!'
                    api.unsendMessage(handleReply.messageID)
                    return api.sendMessage(msg, threadID, (error, info) => {
                        global.client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: "choose_sell",
                        })
                    }, messageID);
                }
                case "3": {
                    const user = require('./pokemon/datauser/' + `${senderID}.json`);
                    var msg = `🔍Chọn pokemon muốn cường hóa\n`
                    var ii = 0;
                    for (let i of user.pet) {
                        msg += `[${++ii}]. ${i.name} - ${i.coins}$\n🐳Type: ${i.type}\n🧡HP: ${i.HP}\n🗡Attack: ${i.Attack}\n🛡Defense: ${i.Defense}\n⚡️Speed: ${i.Speed}\n💰Coins: ${i.coins}$\n\n`
                    }
                    api.unsendMessage(handleReply.messageID)
                    return api.sendMessage(msg, threadID, (error, info) => {
                        global.client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: "choose_buff",
                        })
                    }, messageID);
                }
                case "4": {
                    return api.sendMessage(`👉Các loại rương dành cho bạn:\n[1]. Rương thường (5000$/1 ngày 3 lần)\n[2]. Rương tuyệt phẩm (10000$/3 ngày 1 lần)\n[3]. Rương VIP (20000$/3 ngày 1 lần)\n[4]. Rương FREE (1 tuần/1 lần)\n👉Reply để đưa ra sự lựa chọn của bạn!`, threadID, (error, info) => {
                        global.client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: "choose_box",
                        })
                    }, messageID);
                }
            }
        }
        case "choose_type": {
            if (isNaN(body)) return api.sendMessage("========[POKEMON]========\nLựa chọn của bạn không phải là một con số!", threadID, messageID);
            if (parseInt(body) > 6 || parseInt(body) < 1) return api.sendMessage("========[POKEMON]========\nLựa chọn của bạn không tồn tại!", threadID, messageID);
            var fire = ['Red Stew a la Cube', 'Blue Soda a la Cube', 'Yellow Curry a la Cube', 'Mouth Watering Dip a la Cube', 'Hot Pot a la Cube']
            var electric = ['Watt a Risotto a la Cube', 'Light-as-Air Casserole a la Cube', 'Mouth Watering Dip a la Cube']
            var nor = ['Veggie Smoothie a la Cube', 'Brain Food a la Cube', 'Plain Crepe a la Cube', 'Veggie Smoothie a la Cube']
            var co = ['Sludge Soup a la Cube', 'Veggie Smoothie a la Cube', 'Mouth Watering Dip a la Cube']
            var dat = ['Mud Pie a la Cube', 'Veggie Smoothie a la Cube', 'Light-as-Air Casserole a la Cube', 'Stone Soup a la Cube']
            var water = ['Blue Soda a la Cube', 'Yellow Curry a la Cube', 'Mouth Watering Dip a la Cube']
            var msg = [];
            var coins = 500
            if(body == 1) {
                msg += '🔥Thức ăn dành cho hệ lửa\n'
                for (let i in fire) { msg += `${parseInt(i) + 1}. ${fire[i]} - ${parseInt(i)*1000}$\n`}
                    api.unsendMessage(handleReply.messageID)
                return api.sendMessage(msg, threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "choose_foods",
                        tpy: fire,
                        typePoke: 'Fire'
                    })
                }, messageID);
            }
            if(body == 2) {
                msg += '⚡Thức ăn dành cho hệ điện\n'
                for (let i in electric) { msg += `${parseInt(i) + 1}. ${electric[i]} - ${(parseInt(i) +1) *1000}$\n`}
                    api.unsendMessage(handleReply.messageID)
                return api.sendMessage(msg, threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "choose_foods",
                        tpy: electric,
                        typePoke: 'Electric'
                    })
                }, messageID);
            }
            if(body == 3) {
                msg += '😐Thức ăn dành cho hệ bình thường\n'
                for (let i in nor) { msg += `${parseInt(i) + 1}. ${nor[i]} - ${(parseInt(i) +1) *1000}$\n`}
                    api.unsendMessage(handleReply.messageID)
                return api.sendMessage(msg, threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "choose_foods",
                        tpy: nor,
                        typePoke: 'Normal'
                    })
                }, messageID);
            }
            if(body == 4) {
                msg += '🍀/🐛Thức ăn dành cho hệ cỏ/sâu\n'
                for (let i in co) { msg += `${parseInt(i) + 1}. ${co[i]} - ${(parseInt(i) +1) *1000}$\n`}
                    api.unsendMessage(handleReply.messageID)
                return api.sendMessage(msg, threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "choose_foods",
                        tpy: co,
                        typePoke: 'Grass'
                    })
                }, messageID);
            }
            if(body == 5) {
                msg += '🗻Thức ăn dành cho hệ đất/đá\n'
                for (let i in dat) { msg += `${parseInt(i) + 1}. ${dat[i]} - ${(parseInt(i) +1) *1000}$\n`}
                    api.unsendMessage(handleReply.messageID)
                return api.sendMessage(msg, threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "choose_foods",
                        tpy: dat,
                        typePoke: 'Ground'
                    })
                }, messageID);
            }
            if(body == 6) {
                msg += '💧Thức ăn dành cho hệ nước\n'
                for (let i in water) { msg += `${parseInt(i) + 1}. ${water[i]} - ${(parseInt(i) +1) *1000}$\n`}
                    api.unsendMessage(handleReply.messageID)
                return api.sendMessage(msg, threadID, (error, info) => {
                    global.client.handleReply.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "choose_foods",
                        tpy: water,
                        typePoke: 'Water'
                    })
                }, messageID);
            }           
        }
        case 'choose_foods': {
            if (isNaN(body)) return api.sendMessage("========[POKEMON]========\nLựa chọn của bạn không phải là một con số!", threadID, messageID);
            let balance = (await Currencies.getData(senderID)).money;
            if(balance < parseInt(body) * 1000) return api.sendMessage('Bạn không có đủ tiền để mua thức ăn này\n💰Giá: ' + (parseInt(body) * 1000) + '$', threadID, messageID);
            Currencies.setData(senderID, options = { money: balance - parseInt(body) * 1000 })
            var typ = handleReply.tpy
            var choose = typ[parseInt(body) - 1]
            const pathA = require("path");
            const path = pathA.join(__dirname, 'pokemon', 'datauser', `${senderID}.json`);
            const user = require('./pokemon/datauser/' + `${senderID}.json`);
            user.foods.push({
                name: choose,
                type: handleReply.typePoke,
                HP: parseInt(body) * 4,
                Attack: parseInt(body) * 4,
                Defense: parseInt(body) * 4,
                Speed: parseInt(body) * 4,
            })
            writeFileSync(path, JSON.stringify(user, null, 2));
            api.unsendMessage(handleReply.messageID)
            return api.sendMessage('☑️Mua thành công: ' + choose + ` - ${(parseInt(body) * 1000)}$\n🧡HP: ${parseInt(body) * 4}\n🗡Attack: ${parseInt(body) * 4}\n🛡Defense: ${parseInt(body) * 4}\n⚡️Speed: ${parseInt(body) * 4}\n🐳Type: ${handleReply.typePoke}`, threadID, messageID)
        }
        case 'petFoods': {
            const pathA = require("path");
            const path = pathA.join(__dirname, 'pokemon', 'datauser', `${senderID}.json`);
            const user = require('./pokemon/datauser/' + `${senderID}.json`);
            var pet = handleReply.pet,
                foods = handleReply.food,
                choose = body.split(" ")
            if (parseInt(choose[0]) > pet.length || parseInt(choose[1]) > foods.length || parseInt(choose[0]) < 1 || parseInt(choose[1]) < 1) return api.sendMessage("========[POKEMON]========\nLựa chọn của bạn không tồn tại!", threadID, messageID);
            if(pet[parseInt(choose[0])-1].type.indexOf(foods[parseInt(choose[1])-1].type) !== -1) {
                var HP = ((foods[parseInt(choose[1])-1].HP) * 1.3).toFixed(1)
                var Attack = ((foods[parseInt(choose[1])-1].Attack) * 1.3).toFixed(1)
                var Defense = ((foods[parseInt(choose[1])-1].Defense) * 1.3).toFixed(1)
                var Speed = ((foods[parseInt(choose[1])-1].Speed) * 1.3).toFixed(1)
                var coins = 5000
            } else {
                var HP = foods[parseInt(choose[1])-1].HP
                var Attack = foods[parseInt(choose[1])-1].Attack
                var Defense = foods[parseInt(choose[1])-1].Defense
                var Speed = foods[parseInt(choose[1])-1].Speed
                var coins = 2500
            }
                pet[parseInt(choose[0])-1].HP = pet[parseInt(choose[0])-1].HP + HP
                pet[parseInt(choose[0])-1].Attack = pet[parseInt(choose[0])-1].Attack + Attack
                pet[parseInt(choose[0])-1].Defense = pet[parseInt(choose[0])-1].Defense + Defense
                pet[parseInt(choose[0])-1].Speed = pet[parseInt(choose[0])-1].Speed + Speed
                pet[parseInt(choose[0])-1].coins = pet[parseInt(choose[0])-1].coins + coins
                const index = user.foods.findIndex(item => item.name == foods[parseInt(choose[1])-1].name);
                var name = foods[index].name
                user.foods.splice(index, 1);
                writeFileSync(path, JSON.stringify(user, null, 2));
                api.unsendMessage(handleReply.messageID)
            return api.sendMessage(`${pet[parseInt(choose[0])-1].name} đã ăn thành công ${name}\n🔍Chỉ số pet hiện tại:\n🧡HP: ${(pet[parseInt(choose[0])-1].HP).toFixed(1)}\n🗡Attack: ${(pet[parseInt(choose[0])-1].Attack).toFixed(1)}\n🛡Defense: ${(pet[parseInt(choose[0])-1].Defense).toFixed(1)}\n⚡️Speed: ${(pet[parseInt(choose[0])-1].Speed).toFixed(1)}`, threadID, messageID)
        }
        case 'choose_sell': {
            const pathA = require("path");
            const path = pathA.join(__dirname, 'pokemon', 'datauser', `${senderID}.json`);
            const user = require('./pokemon/datauser/' + `${senderID}.json`);
            const pokeSell = user.pet[parseInt(body)-1].name
            const index = user.pet.findIndex(item => item.name == pokeSell);
            const name = user.pet[index].name
            const coins = user.pet[index].coins
            user.pet.splice(index, 1);
            writeFileSync(path, JSON.stringify(user, null, 2));
            api.unsendMessage(handleReply.messageID)
            let balance = (await Currencies.getData(senderID)).money;
            Currencies.setData(senderID, options = { money: balance + parseInt(coins) })
            return api.sendMessage(`💰Bạn đã bán thành công ${name} với giá ${coins}$`, threadID, messageID);
        }
        case 'choose_buff': {
            let balance = (await Currencies.getData(senderID)).money;
            if(balance < 70000) return api.sendMessage('Bạn không có đủ tiền để mua pokemon này\n💰Giá: ' + 50000 + '$', threadID, messageID);
            Currencies.setData(senderID, options = { money: balance - 70000 })
            const pathA = require("path");
            const path = pathA.join(__dirname, 'pokemon', 'datauser', `${senderID}.json`);
            const user = require('./pokemon/datauser/' + `${senderID}.json`);
            const pokeSell = user.pet[parseInt(body)-1].name
            const index = user.pet.findIndex(item => item.name == pokeSell);
            var poke = user.pet[index]
                poke.HP = (poke.HP + poke.HP * 40/100).toFixed(1)
                poke.Attack = (poke.Attack + poke.Attack * 40/100).toFixed(1)
                poke.Defense = (poke.Defense + poke.Defense * 40/100).toFixed(1)
                poke.Speed = (poke.Speed + poke.Speed * 40/100).toFixed(1)
                poke.coins = (poke.coins + poke.coins * 20/100).toFixed(1)
            writeFileSync(path, JSON.stringify(user, null, 2));
            api.unsendMessage(handleReply.messageID)
            return api.sendMessage(`💹Cường hóa thành công ${poke.name}\n🔍Chỉ số hiện tại:\n🧡HP: ${poke.HP}\n🗡Attack: ${poke.Attack}\n🛡Defense: ${poke.Defense}\n⚡️Speed: ${poke.Speed}\n💰Coins: ${poke.coins}$`, threadID, messageID);
        }
        case 'choose_box': {
            let balance = (await Currencies.getData(senderID)).money;
            if(body == 1) {
                const cooldown = 86400000 * 3
                let data = (await Currencies.getData(senderID)).data || {};
                if (typeof data !== "undefined" && cooldown - (Date.now() - data.PRO) > 0) {
                    var time = cooldown - (Date.now() - data.PRO),
                        minutes = Math.floor(time / 60000),
                        seconds = ((time % 60000) / 1000).toFixed(0); 
                    if(minutes / 60 > 1) return api.sendMessage(`⏰Vui lòng chờ ${(minutes / 60).toFixed(0)} giờ`, threadID, messageID);
                    return api.sendMessage(`⏰Vui lòng chờ ${minutes} phút ${seconds} giây`, threadID, messageID);
                }
                if(balance < 5000) return api.sendMessage('Bạn không có đủ tiền để mua rương này\n💰Giá: 5000$', threadID, messageID);
                Currencies.setData(senderID, options = { money: balance - 5000 })
                var msg = '☑️Mua thành công rương thường (5000$)\n👉Thả cảm xúc "👍" vào để mở nó'
                    api.unsendMessage(handleReply.messageID)
                
                return api.sendMessage(msg, threadID, (error, info) => {
                    global.client.handleReaction.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "openBox",
                        tpy: 0.5,
                        money: 5000
                    })
                }, messageID);
            }
            if(body == 2) {
                const cooldown = 86400000 * 3
                let data = (await Currencies.getData(senderID)).data || {};
                if (typeof data !== "undefined" && cooldown - (Date.now() - data.ULTRA) > 0) {
                    var time = cooldown - (Date.now() - data.ULTRA),
                        minutes = Math.floor(time / 60000),
                        seconds = ((time % 60000) / 1000).toFixed(0); 
                    if(minutes / 60 > 1) return api.sendMessage(`⏰Vui lòng chờ ${(minutes / 60).toFixed(0)} giờ`, threadID, messageID);
                    return api.sendMessage(`⏰Vui lòng chờ ${minutes} phút ${seconds} giây`, threadID, messageID);
                }
                if(balance < 10000) return api.sendMessage('Bạn không có đủ tiền để mua rương này\n💰Giá: 10000$', threadID, messageID);
                Currencies.setData(senderID, options = { money: balance - 10000 })
                var msg = '☑️Mua thành công rương tuyệt phẩm (10000$)\n👉Thả cảm xúc "👍" vào để mở nó'
                    api.unsendMessage(handleReply.messageID)
                
                return api.sendMessage(msg, threadID, (error, info) => {
                    global.client.handleReaction.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "openBox",
                        tpy: 1,
                        money: 10000
                    })
                }, messageID);
            }
            if(body == 3) {
                const cooldown = 86400000 * 3
                let data = (await Currencies.getData(senderID)).data || {};
                if (typeof data !== "undefined" && cooldown - (Date.now() - data.MEGA) > 0) {
                    var time = cooldown - (Date.now() - data.MEGA),
                        minutes = Math.floor(time / 60000),
                        seconds = ((time % 60000) / 1000).toFixed(0); 
                    if(minutes / 60 > 1) return api.sendMessage(`⏰Vui lòng chờ ${(minutes / 60).toFixed(0)} giờ`, threadID, messageID);
                    return api.sendMessage(`⏰Vui lòng chờ ${minutes} phút ${seconds} giây`, threadID, messageID);
                }
                if(balance < 20000) return api.sendMessage('Bạn không có đủ tiền để mua rương này\n💰Giá: 20000$', threadID, messageID);
                Currencies.setData(senderID, options = { money: balance - 20000 })
                var msg = '☑️Mua thành công rương VIP (20000$)\n👉Thả cảm xúc "👍" vào để mở nó'
                    api.unsendMessage(handleReply.messageID)
                
                return api.sendMessage(msg, threadID, (error, info) => {
                    global.client.handleReaction.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "openBox",
                        tpy: 1.5,
                        money: 20000
                    })
                }, messageID);
            }
            if(body == 4) {
                const cooldown = 86400000 * 7
                let data = (await Currencies.getData(senderID)).data || {};
                if (typeof data !== "undefined" && cooldown - (Date.now() - data.FREE) > 0) {
                    var time = cooldown - (Date.now() - data.FREE),
                        minutes = Math.floor(time / 60000),
                        seconds = ((time % 60000) / 1000).toFixed(0); 
                    if(minutes / 60 > 1) return api.sendMessage(`⏰Vui lòng chờ ${(minutes / 60).toFixed(0)} giờ`, threadID, messageID);
                    return api.sendMessage(`⏰Vui lòng chờ ${minutes} phút ${seconds} giây`, threadID, messageID);
                }
                var msg = '☑️Mua thành công rương FREE 3 ngày/1 lần (0$)\n👉Thả cảm xúc "👍" vào để mở nó'
                    api.unsendMessage(handleReply.messageID)
                
                return api.sendMessage(msg, threadID, async (error, info) => {
                    global.client.handleReaction.push({
                        name: this.config.name,
                        messageID: info.messageID,
                        author: event.senderID,
                        type: "openBox",
                        tpy: 0.4,
                        money: 0
                    })
                }, messageID);
            }
        }
        case 'playerSolo': {
            var author = handleReply.author
            var name = (await Users.getData(author)).name
            if (isNaN(body)) return api.sendMessage("========[POKEMON]========\nLựa chọn của bạn không phải là một con số!", threadID, messageID);
            if(parseInt(body) > handleReply.pet.length || parseInt(body) < 1) return api.sendMessage("========[POKEMON]========\nLựa chọn của bạn không tồn tại!", threadID, messageID);
            var pet = handleReply.pet[parseInt(body) -1]
            api.unsendMessage(handleReply.messageID)
            var image = [];
            var gameThread = global.pokemon.get(threadID) || {};
            var s = gameThread.player.findIndex(i => i.userID == senderID);
            var q = gameThread.player[s];
            gameThread.player.splice(s, 1);
            gameThread.player.push({ name: q.name, userID: senderID, choose: { status: true, msg: { name: pet.name ,type: pet.type, HP: pet.HP, Attack: pet.Attack, Defense: pet.Defense, Speed: pet.Speed, skill: pet.skill, images: pet.images } } });
                gameThread.number = gameThread.number + 1;
                global.pokemon.set(threadID, gameThread);
                let pokemon = (await axios.get(pet.images, { responseType: "arraybuffer" } )).data;
                writeFileSync( __dirname + `/pokemon/cache/${gameThread.number}.png`, Buffer.from(pokemon, "utf-8") );
                image.push(createReadStream(__dirname + `/pokemon/cache/${gameThread.number}.png`));
                var msg = { body: `🎉${name} đã chọn ${pet.name}\n⚔️Type: ${pet.type}\nChỉ số:\n🧡HP: ${pet.HP}\n🗡Attack: ${pet.Attack}\n🛡Defense: ${pet.Defense}\n⚡️Speed: ${pet.Speed}\n📌Skill: ${pet.skill.join(', ')}`, attachment: image }
                api.sendMessage(msg, senderID)
            api.sendMessage(name + ' đã hoàn tất việc chọn pokemon', threadID, messageID)
            if(gameThread.number != 2) return;
            if(gameThread.number == 2) {
                setTimeout(() => {
                    var msg = [], i = 1;
                    for (let user of gameThread.player) {
                        var data = user.choose.msg
                        msg += `[ Người chơi ${i++}: ${user.name} ]\n🎉Pokemon ra trận: ${data.name}\n⚔️Type: ${data.type}\n👉Các chỉ số cơ bản:\n🧡HP: ${data.HP}\n🗡Attack: ${data.Attack}\n🛡Defense: ${data.Defense}\n⚡️Speed: ${data.Speed}\n📌Skill: ${data.skill.join(', ')}\n\n`
                    }
                    api.sendMessage(msg, threadID, messageID);
                }, 5000);
                var map = [
                        'Bản đồ trên không', 
                        'Bản đồ trên mặt nước', 
                        'Bản đồ núi lửa', 
                        'Bản đồ mưa (có sấm)', 
                        'Bản đồ trong rừng', 
                        'Bản đồ núi đá', 
                        'Bản đồ băng tuyết', 
                        'Bản đồ sương mù', 
                        'Bản đồ Mê cung',
                        'Bản đồ ma quái',
                        'Bản đồ vũ trụ',
                        'Bản đồ cao nguyên xanh'
                        ];
                var rdMap = map[Math.floor(Math.random() * map.length)];   
                setTimeout(() => {
                    if(map[0] == rdMap) var buffType = 'Flying, Fire, Normal';
                    if(map[1] == rdMap) var buffType = 'Water, Electric, Ghost';
                    if(map[2] == rdMap) var buffType = 'Fire, Water, Dragon';
                    if(map[3] == rdMap) var buffType = 'Electric, Water, Grass';
                    if(map[4] == rdMap) var buffType = 'Bug, Grass, Fire';
                    if(map[5] == rdMap) var buffType = 'Ground, Rock, Electric';
                    if(map[6] == rdMap) var buffType = 'Ice, Steel, Psychic';
                    if(map[7] == rdMap) var buffType = 'Steel, Ghost, Rock';
                    if(map[8] == rdMap) var buffType = 'Dark, Ghost, Grass';
                    if(map[9] == rdMap) var buffType = 'Ground, Steel, Rock';
                    if(map[10] == rdMap) var buffType = 'Flying, Dragon, Dark';
                    if(map[10] == rdMap) var buffType = 'Bug, Ice, Flying';
                    if(map[11] == rdMap) var buffType = 'Poison, Normal, Dark';
                    api.sendMessage(`[RANDOM MAP] - ${rdMap}\n💪Tăng sức mạnh cho hệ '${buffType}'`, threadID);
                    setTimeout(() => {
                        var user_1 = gameThread.player[0]
                        var user_2 = gameThread.player[1]
                        var image = [];
                        if(buffType.indexOf(user_1.choose.msg.type) !== -1) {
                            var search = gameThread.player.findIndex(i => i.userID == user_1.userID);
                            var index = gameThread.player[search].choose.msg;
                                index.HP = (index.HP + index.HP * 40/100).toFixed(1);
                                index.Attack = (index.Attack + index.Attack * 40/100).toFixed(1);
                                index.Defense = (index.Defense + index.Defense * 40/100).toFixed(1);
                                index.Speed = (index.Speed + index.Speed * 40/100).toFixed(1);
                                global.pokemon.set(threadID, gameThread);
                            var poke_1 = gameThread.player[search] || {};
                            api.sendMessage(`👤${poke_1.name}\n🗺️MAP đấu BUFF sức mạnh của ${poke_1.choose.msg.name}\n🧡HP: ${poke_1.choose.msg.HP}\n🗡Attack: ${poke_1.choose.msg.Attack}\n🛡Defense: ${poke_1.choose.msg.Defense}\n⚡️Speed: ${poke_1.choose.msg.Speed}`, threadID);
                        }
                        if(buffType.indexOf(user_2.choose.msg.type) !== -1) {
                            var search = gameThread.player.findIndex(i => i.userID == user_2.userID);
                            var index = gameThread.player[search].choose.msg;
                                index.HP = (index.HP + index.HP * 40/100).toFixed(1);
                                index.Attack = (index.Attack + index.Attack * 40/100).toFixed(1);
                                index.Defense = (index.Defense + index.Defense * 40/100).toFixed(1);
                                index.Speed = (index.Speed + index.Speed * 40/100).toFixed(1);
                                global.pokemon.set(threadID, gameThread);
                            var poke_2 = gameThread.player[search] || {};
                            api.sendMessage(`👤${poke_2.name}\n🗺️MAP đấu BUFF sức mạnh cho ${poke_2.choose.msg.name}\n🧡HP: ${poke_2.choose.msg.HP}\n🗡Attack: ${poke_2.choose.msg.Attack}\n🛡Defense: ${poke_2.choose.msg.Defense}\n⚡️Speed: ${poke_2.choose.msg.Speed}`, threadID);
                        }
                        //---------->canvas<-----------//
                        var skill = pet.skill
                        setTimeout( async function () {
                            var { loadImage, createCanvas, Canvas } = require("canvas");
                            var Canvas = require("canvas");
                            var fs = require("fs-extra");
                            if(!existsSync(__dirname+'/pokemon/cache/Bangers-Regular.ttf')) { 
                                let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=1tD8kgjXszN_amDVUPwbGdlT6PJxDRhYq&export=download`, { responseType: "arraybuffer" })).data;
                                writeFileSync(__dirname+"/pokemon/cache/Bangers-Regular.ttf", Buffer.from(getfont, "utf-8"));
                            };
                            var backgoundP = (await axios.get('https://i.imgur.com/fIiQ3nQ.jpg', { responseType: "arraybuffer" })).data;
                            writeFileSync(__dirname + "/cache/backgound.png", Buffer.from(backgoundP, "utf-8") );
                            var pokemonF = (await axios.get(user_1.choose.msg.images, { responseType: "arraybuffer" } )).data; 
                            writeFileSync(__dirname + "/cache/pokemonF.png", Buffer.from(pokemonF, "utf-8") );
                            var pokemonS = (await axios.get(user_2.choose.msg.images, { responseType: "arraybuffer" } )).data; 
                            writeFileSync(__dirname + "/cache/pokemonS.png", Buffer.from(pokemonS, "utf-8") );
                            var loadBackgound = await loadImage(__dirname + "/cache/backgound.png");
                            var loadPokeF = await loadImage(__dirname + "/cache/pokemonF.png");
                            var loadPokeS = await loadImage(__dirname + "/cache/pokemonS.png");
                            var canvas = createCanvas(loadBackgound.width, loadBackgound.height);
                            Canvas.registerFont(__dirname + `/pokemon/cache/Bangers-Regular.ttf`, { family: "Bangers-Regula" });
                            var ctx = canvas.getContext("2d");
                                ctx.drawImage(loadBackgound, 0, 0, canvas.width, canvas.height);
                                ctx.drawImage(loadPokeF, 251, 196, 400, 400);
                                ctx.drawImage(loadPokeS, 1279, 196, 400, 400);
                                ctx.font = "55px Bangers-Regula";
                                ctx.fillStyle = "#0000BB";
                                ctx.textAlign = "center";
                                ctx.fillText(user_1.choose.msg.name, 392, 790);
                                ctx.fillText(user_2.choose.msg.name, 1516, 790);
                            var imageBuffer = canvas.toBuffer();
                            writeFileSync(__dirname + "/cache/backgound.png", imageBuffer);
                            api.sendMessage({body: `🧡[${user_1.choose.msg.name}] ⚔️ [${user_2.choose.msg.name}]🧡`, attachment: createReadStream(__dirname + "/cache/backgound.png")},threadID)
                            setTimeout( async function () {
                                var content = [user_1.choose.msg.images, 'https://i.imgur.com/JCpX8Eq.png', user_2.choose.msg.images, 'https://i.imgur.com/SfTPzSU.png', 'https://i.imgur.com/nHmSEGK.png']
                                var GIFEncoder = require('gifencoder');
                                var encoder = new GIFEncoder(500, 500);
                                encoder.start();
                                var canvas = createCanvas(500, 500);
                                var ctx = canvas.getContext('2d');
                                var i = 0;
                                for(let id of content) {
                                  encoder.setRepeat(-1);  
                                  encoder.setDelay(1000); 
                                  encoder.setQuality(10);
                                  try { 
                                    var pathPokeGif = (__dirname+`/cache/poke${i++}.png`)
                                    var imagee = (await axios.get(id, { responseType: 'arraybuffer' })).data; 
                                    writeFileSync(pathPokeGif, Buffer.from(imagee, 'utf-8'));
                                    let baseImage = await loadImage(pathPokeGif);
                                    ctx.shadowColor = '#FFFF00';
                                    ctx.shadowBlur = 60;
                                    ctx.shadowOffsetX = 0;
                                    ctx.shadowOffsetY = 0;
                                    ctx.fillRect(0, 0, canvas.width, canvas.height)
                                    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
                                    encoder.addFrame(ctx);
                                    unlinkSync(pathPokeGif)
                                  } 
                                  catch(e) { continue }
                                }
                                encoder.finish();
                                const path = __dirname + '/pokemon/cache/abc.gif'
                                const buf = encoder.out.getData();
                                writeFile(path, buf)
                                setTimeout( function () {
                                    api.sendMessage({body: '⚔️Kết quả trận đấu có sau trong giây lát!', attachment: createReadStream(path)}, threadID)
                                    var index_1 = poke_1 || user_1
                                    var index_2 = poke_2 || user_2
                                    var name_1 = index_1.name
                                    var name_2 = index_2.name
                                    var TB_1 = index_1.choose.msg.HP + index_1.choose.msg.Attack + index_1.choose.msg.Defense + index_1.choose.msg.Speed
                                    var TB_2 = index_2.choose.msg.HP + index_2.choose.msg.Attack + index_2.choose.msg.Defense + index_2.choose.msg.Speed
                                    setTimeout( async function () {
                                        var imageee = [];
                                        const pathA = require("path");
                                        global.pokemon.delete(threadID);
                                        if(TB_1 > TB_2) {
                                            let pokemon = (await axios.get(index_1.choose.msg.images, { responseType: "arraybuffer" } )).data;
                                            writeFileSync( __dirname + `/pokemon/cache/nguoichoi1.png`, Buffer.from(pokemon, "utf-8") );
                                            imageee.push(createReadStream(__dirname + `/pokemon/cache/nguoichoi1.png`));
                                            var user_1 = require('./pokemon/datauser/' + `${index_1.userID}.json`);
                                            var user_2 = require('./pokemon/datauser/' + `${index_2.userID}.json`);
                                            var path_1 = pathA.join(__dirname, 'pokemon', 'datauser', `${index_1.userID}.json`);
                                            var path_2 = pathA.join(__dirname, 'pokemon', 'datauser', `${index_2.userID}.json`);
                                            var find = user_1.pet.find(i => i.name == index_1.choose.msg.name)
                                                find.HP = (find.HP + find.HP * 5/100);
                                                find.Attack = (find.Attack + find.Attack * 5/100);
                                                find.Defense = (find.Defense + find.Defense * 5/100);
                                                find.Speed = (find.Speed + find.Speed * 5/100);
                                                find.coins = (find.coins + find.coins * 5/100);
                                            var win = user_1.solo
                                                win.win = win.win + 1
                                            var find = user_2.pet.find(i => i.name == index_2.choose.msg.name)
                                                find.HP = (find.HP - find.HP * 5/100).toFixed(1);
                                                find.Attack = (find.Attack - find.Attack * 5/100)
                                                find.Defense = (find.Defense - find.Defense * 5/100);
                                                find.Speed = (find.Speed - find.Speed * 5/100);
                                                find.coins = (find.coins - find.coins * 5/100);
                                            var lose = user_2.solo
                                                lose.lose = lose.lose + 1
                                                writeFileSync(path_1, JSON.stringify(user_1, null, 2));
                                                writeFileSync(path_2, JSON.stringify(user_2, null, 2));
                                            var msg = {body: `🎉${index_1.choose.msg.name} của người chơi ${name_1} đã chiến thắnggg!\n☑️Tất cả chỉ số cơ bản của pokemon thắng này được tăng 5%, ngược lại thì sẽ bị trừ 5%!`, attachment: imageee}
                                            return api.sendMessage(msg, threadID);
                                        } 
                                        else if(TB_1 < TB_2) { 
                                            let pokemon = (await axios.get(index_2.choose.msg.images, { responseType: "arraybuffer" } )).data;
                                            writeFileSync( __dirname + `/pokemon/cache/nguoichoi2.png`, Buffer.from(pokemon, "utf-8") );
                                            imageee.push(createReadStream(__dirname + `/pokemon/cache/nguoichoi2.png`));
                                            var user_1 = require('./pokemon/datauser/' + `${index_1.userID}.json`);
                                            var user_2 = require('./pokemon/datauser/' + `${index_2.userID}.json`);
                                            var path_1 = pathA.join(__dirname, 'pokemon', 'datauser', `${index_1.userID}.json`);
                                            var path_2 = pathA.join(__dirname, 'pokemon', 'datauser', `${index_2.userID}.json`);
                                            var find = user_2.pet.find(i => i.name == index_2.choose.msg.name)
                                                find.HP = (find.HP + find.HP * 5/100);
                                                find.Attack = (find.Attack + find.Attack * 5/100);
                                                find.Defense = (find.Defense + find.Defense * 5/100);
                                                find.Speed = (find.Speed + find.Speed * 5/100);
                                                find.coins = (find.coins + find.coins * 5/100);
                                            var win = user_2.solo
                                                win.win = win.win + 1
                                            var find = user_1.pet.find(i => i.name == index_1.choose.msg.name)
                                                find.HP = (find.HP - find.HP * 5/100);
                                                find.Attack = (find.Attack - find.Attack * 5/100);
                                                find.Defense = (find.Defense - find.Defense * 5/100);
                                                find.Speed = (find.Speed - find.Speed * 5/100);
                                                find.coins = (find.coins - find.coins * 5/100);
                                            var lose = user_1.solo
                                                lose.lose = lose.lose + 1
                                                writeFileSync(path_1, JSON.stringify(user_1, null, 2));
                                                writeFileSync(path_2, JSON.stringify(user_2, null, 2));
                                            var msg = {body: `🎉${index_2.choose.msg.name} của người chơi ${name_2} đã chiến thắnggg!\n☑️Tất cả chỉ số cơ bản của pokemon này được tăng 5%, ngược lại thì sẽ bị trừ 5%!`, attachment: imageee}
                                            return api.sendMessage(msg, threadID);
                                        } 
                                        else {
                                            var user_1 = require('./pokemon/datauser/' + `${index_1.userID}.json`);
                                            var user_2 = require('./pokemon/datauser/' + `${index_2.userID}.json`);
                                            var path_1 = pathA.join(__dirname, 'pokemon', 'datauser', `${index_1.userID}.json`);
                                            var path_2 = pathA.join(__dirname, 'pokemon', 'datauser', `${index_2.userID}.json`);
                                            var win = user_1.solo
                                                win.draw = win.draw + 1
                                            var win = user_2.solo
                                                win.draw = win.draw + 1
                                                writeFileSync(path_1, JSON.stringify(user_1, null, 2));
                                                writeFileSync(path_2, JSON.stringify(user_2, null, 2));
                                            return api.sendMessage('🎉Các chỉ số của 2 pokemon đang chiến đấu gần như bằng nhau nên trận này hòa!', threadID); 
                                        }
                                    }, 7000);
                                }, 2000);
                            }, 500);
                        }, 3000);
                    }, 2000);
                }, 8000);
            }
        }
    }
}
module.exports.handleReaction = async ({ api, event, handleReaction, Currencies }) => {
    if (parseInt(event.userID) !== parseInt(handleReaction.author)) return;
    const { threadID, messageID, senderID } = event;
    const { readFileSync, writeFileSync, existsSync, createReadStream } = require("fs-extra")
    const axios = require("axios")
    if (event.reaction != "👍") return;
    switch (handleReaction.type) {
        case 'buyPokemon': {
            const pathA = require("path");
            const path = pathA.join(__dirname, 'pokemon', 'datauser', `${handleReaction.author}.json`);
            const user = require('./pokemon/datauser/' + `${handleReaction.author}.json`);
            const listPoke = require("./pokemon/pokemon.json");
            const index = listPoke[handleReaction.ID];
            let balance = (await Currencies.getData(handleReaction.author)).money;
            if(user.pet.some(i => i.name == index.name) == true) return api.sendMessage('❌Bạn đã mua pokemon này trước đó', threadID, messageID);
            if(balance < parseInt(index.coins)) return api.sendMessage('Bạn không có đủ tiền để mua pokemon này\n💰Giá: ' + index.coins + '$', threadID, messageID);
            Currencies.setData(handleReaction.author, options = { money: balance - parseInt(index.coins) })
            var skill = [], skillS = []
            for (let i of index.skill) {
                skill.push(i[0])
                skillS += i[0] + ', '
            }
            user.pet.push({
                name: index.name,
                type: index.type,
                HP: index.power.HP,
                Attack: index.power.Attack,
                Defense: index.power.Defense,
                Speed: index.power.Speed,
                coins: index.coins,
                skill: skill,
                images: index.images
            })
            var image = [];
            writeFileSync(path, JSON.stringify(user, null, 2));
            let pokemon = (await axios.get(index.images, { responseType: "arraybuffer" } )).data;
            writeFileSync( __dirname + "/pokemon/cache/pokemon.png", Buffer.from(pokemon, "utf-8") );
            image.push(createReadStream(__dirname + "/pokemon/cache/pokemon.png"));
            api.unsendMessage(handleReaction.messageID)
            var msg = {body: `☑️Mua thành công: ${index.name} - ${index.coins}$\n🔍Chỉ số:\n🧡HP: ${index.power.HP}\n🗡Attack: ${index.power.Attack}\n🛡Defense: ${index.power.Defense}\n⚡️Speed: ${index.power.Speed}\n📌Skill: ${skillS.replace(/,\s*$/, "")}`, attachment: image}
            return api.sendMessage(msg, threadID, messageID);
        }
        case 'infoPoke': {
            var skill = [];
            const user = require('./pokemon/datauser/' + `${handleReaction.author}.json`);
            var msg = `🔍Số pokemon hiện có ${user.pet.length}\n`
            var ii = 0;
            for (let i of user.pet) {
                msg += `[${++ii}]. ${i.name} - ${i.coins}$\n🐳Type: ${i.type}\n🧡HP: ${i.HP}\n🗡Attack: ${i.Attack}\n🛡Defense: ${i.Defense}\n⚡️Speed: ${i.Speed}\n📌Skill: ${i.skill.join(', ')}\n\n`
            }
            api.unsendMessage(handleReaction.messageID)
            return api.sendMessage(msg, threadID, messageID);
        }
        case 'openBox': {
            api.unsendMessage(handleReaction.messageID)
            const pathA = require("path");
            const path = pathA.join(__dirname, 'pokemon', 'datauser', `${handleReaction.author}.json`);
            const user = require('./pokemon/datauser/' + `${handleReaction.author}.json`);
            const listPoke = require("./pokemon/pokemon.json");
            var rd = listPoke[Math.floor(Math.random() * listPoke.length)]; 
            var image = [];
            if(user.pet.includes(rd)) {
                let balance = (await Currencies.getData(handleReaction.author)).money;
                Currencies.setData(handleReaction.author, options = { money: balance + parseInt(rd.coins) })
                return api.sendMessage(`❌Bạn mở trúng ${rd.name} nhưng bạn đã sở hữu rồi nên được hoàn tiền lại❌`, threadID, messageID);
            }
            if(handleReaction.tpy == 0.5) {
                data.PRO = Date.now();
                await Currencies.setData(handleReaction.author, { data });
            }
            if(handleReaction.tpy == 1) {
                data.ULTRA = Date.now();
                await Currencies.setData(handleReaction.author, { data });
            }
            if(handleReaction.tpy == 1.5) {
                data.MEGA = Date.now();
                await Currencies.setData(handleReaction.author, { data });
            }
            if(handleReaction.tpy == 0.4) {
                data.FREE = Date.now();
                await Currencies.setData(handleReaction.author, { data });
            }
            var skill = [], skillS = []
            for (let i of rd.skill) {
                skill.push(i[0])
                skillS += i[0] + ', '
            }
            user.pet.push({
                name: rd.name,
                type: rd.type,
                HP: (rd.power.HP * handleReaction.tpy).toFixed(1),
                Attack: (rd.power.Attack * handleReaction.tpy).toFixed(1),
                Defense: (rd.power.Defense * handleReaction.tpy).toFixed(1),
                Speed: (rd.power.Speed * handleReaction.tpy).toFixed(1),
                skill: skill,
                coins: handleReaction.money,
                images: rd.images
            })
            writeFileSync(path, JSON.stringify(user, null, 2));
            let pokemon = (await axios.get(rd.images, { responseType: "arraybuffer" } )).data;
            writeFileSync( __dirname + "/pokemon/cache/pokemon.png", Buffer.from(pokemon, "utf-8") );
            image.push(createReadStream(__dirname + "/pokemon/cache/pokemon.png"));
            var msg = {body: `🎉Xin chúc mừng!\n☑️Bạn mở trúng ${rd.name}.\nType: ${rd.type}\n🔍Chỉ số: \n🧡HP: ${(rd.power.HP* handleReaction.tpy).toFixed(1)}\n🗡Attack: ${(rd.power.Attack* handleReaction.tpy).toFixed(1)}\n🛡Defense: ${(rd.power.Defense* handleReaction.tpy).toFixed(1)}\n⚡️Speed: ${(rd.power.Speed* handleReaction.tpy).toFixed(1)}\n📌Skill: ${skillS.replace(/,\s*$/, "")}\n💰Coins: ${handleReaction.money}$\n☑️Đã thêm pokemon vào kho đồ của bạn!`, attachment: image}
            return api.sendMessage(msg, threadID, messageID);
        }
    }
}