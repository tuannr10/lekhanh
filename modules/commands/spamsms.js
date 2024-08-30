const axios = require('axios')

module.exports = {
  config: {
    name: "spamsms",
  version: "1.0.0",
  hasPermission: 2,
  credits: "L.V. Bằng",
  description: "Spam sms + call",
  usePrefix: true,
  usages: "",
  commandCategory: "Thành Viên",
  cooldowns: 0,
  },

  run: async function({ args, event, api }) {
    const { sendMessage } = api;
    const { threadID: tid, messageID: mid } = event;
    const forbiddenPhone = ['0966852850', '0966125309'];
    const sdt = args[0];
    if (!sdt || sdt.length !== 10 || !sdt.startsWith('0')) {
return sendMessage('Vui lòng nhập sdt\n📍 Ví dụ:\n🧪 Spam 0909090908 1 1\n⚡ Số lượt trc dộ delay sau',event.threadID, event.messageID)
    } else if (forbiddenPhone.includes(sdt)) {
      return sendMessage('Spam con cặt!', tid, mid);
    }
    const luot = args[1];
    if (luot > 200) {
      return sendMessage('Số lượt phải bé hơn 200', tid, mid);
    }
    const delay = args[2];
    if (delay < 1 || delay > 500) {
      return sendMessage('Delay phải lớn hơn 0 và bé hơn 500', tid, mid);
    }
    if (args.length !== 3) {
      return sendMessage('Vui lòng nhập đúng định dạng <sdt> <lượt> <delay>!\nEx: 033xxxxxxx 1 15')
    }
    sendMessage(`Đang tiến hành spam sđt: ${sdt}
Số lượt: ${luot}
Delay: ${delay}`, tid, mid);
    const start = Date.now();
const { totalCallApi, success, fail } = ( await axios.get('https://spam-1.qvapi.repl.co/spam?sdt=' + sdt + '&luot=' + luot + '&delay=' + delay)).data;
    return sendMessage(`Trạng thái: Thành công!
────────────────
Số luợt: ${luot} lượt
────────────────
Số lượt call api: ${totalCallApi} lượt
────────────────
Thành công: ${success} lượt
────────────────
Thất bại: ${fail} lượt
────────────────
Thời gian xử lí: ${((Date.now() - start) / 1000).toFixed(1)} giây
────────────────
FUCKYOU MẤY ĐỨA BỊ SPAM`, tid, mid);
  }
}