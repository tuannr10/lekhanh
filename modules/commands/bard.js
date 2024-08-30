const axios = require('axios');

module.exports["config"] = {
  name: "ai",
  version: "1.0.0",
  credits: "Liane",
  hasPermission: 0,
  commandCategory: "Tiện ích",
  usage: "[ prefix ]gpt [prompt]",
  usePrefix: true,
  cooldowns: 0
};

module.exports["run"] = async ({ api, event, args, Users }) => {
  try {
    const query = args.join(" ") || "xin chào" || "hello" || "hi";
    const { name } = await Users.getData(event.senderID);

    if (query) {
      api.setMessageReaction("😴", event.messageID, (err) => console.log(err), true);
      

      const apiUrl = `https://liaspark.chatbotcommunity.ltd/@unregistered/api/yuki2?userName=${encodeURIComponent(name)}&key=j86bwkwo-8hako-12C&query=${encodeURIComponent(query)}`;
      const response = await axios.get(apiUrl);

      if (response.data && response.data.message) {
        const trimmedMessage = response.data.message.trim();
        api.setMessageReaction("💖", event.messageID, (err) => console.log(err), true);
        await api.sendMessage({ body: trimmedMessage }, event.threadID, event.messageID);

        console.log(`Sent Best GPT's response to the user`);
      } else {
        throw new Error(`Invalid or missing response from Best GPT API`);
      }

      await api.unsendMessage(processingMessage.messageID);
    }
  } catch (error) {
    console.error(`❌ | Failed to get Best GPT's response: ${error.message}`);
    const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
    api.sendMessage(errorMessage, event.threadID);
  }
};