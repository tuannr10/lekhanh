const axios = require('axios');

module.exports = {
  config: {
    name: 'vuotlink',
    version: '1.0.0',
    hasPermssion: 0,
    credits: 'Mây Trắng',
    description: 'Bypass link',
    commandCategory: 'Công Cụ',
    usages: '[link]',
    cooldowns: 3
  },

  run: async function({ api, event, args }) {
    let link = args.join(" ");

const adminIDs = ["61550962658401"];
    if (!adminIDs.includes(event.senderID)) {
      return api.sendMessage('Bạn Chưa Được Phép Dùng Lệnh Này.', event.threadID);
    }
    

    link = link.replace(/^https?:\/\//, '');
    
    
    link = link.replace(/\/.*/, '');

    const validLinks = ['traffic123', 'link68', 'laymangay'];

        if (!validLinks.includes(link)) {
      return api.sendMessage(`Các link hiện có thể bypass là:\n- traffic123.net\n- link68.net\n- laymangay.com\n- traffic123.com\n- laymangay.net`, event.threadID);
    }

    try {
      const response = await axios.get(`https://13b6b5d1-7187-457a-a039-c2a392532884-00-l82ei4o02v0y.sisko.replit.dev:9000/vuot-link?bypass=${link}`);
      const { status, password } = response.data;

      if (status) {
        api.sendMessage(`Mã: ${password}`, event.threadID);
      } else {
        api.sendMessage('Không tìm thấy Mã.', event.threadID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage('Có lỗi xảy ra, vui lòng thử lại sau.', event.threadID);
    }
  }
};