module.exports.config = {
	name: "joinNoti",
	eventType: ["log:subscribe"],
	version: "1.0.1",
	credits: "Mirai Team",
	description: "Thông báo bot hoặc người vào nhóm có random gif/ảnh/video",
	dependencies: {
		"fs-extra": "",
		"path": "",
		"pidusage": ""
	}
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

	const path = join(__dirname, "cache", "joinGif");
	if (existsSync(path)) mkdirSync(path, { recursive: true });	

	const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}


module.exports.run = async function({ api, event }) {
	const { join } = global.nodemodule["path"];
	const { threadID } = event;
  ////////////////////////////////////////////////////////
  const thread = global.data.threadData.get(threadID) || {};
  if (typeof thread["joinNoti"] != "undefined" && thread["joinNoti"] == false) return;
  ///////////////////////////////////////////////////////
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`» ${global.config.PREFIX} « • ${(!global.config.BOTNAME) ? "Made by Duy" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		const fs = require("fs");
		return api.sendMessage("", event.threadID, () => api.sendMessage({body:`𝐗𝐢𝐧 𝐜𝐡𝐚̀𝐨 𝐦𝐢̀𝐧𝐡 𝐥𝐚̀ 𝐁𝐎𝐓 𝐇𝐂𝐇𝐎𝐍𝐆, 𝐠𝐨̃ .𝐡𝐞𝐥𝐩 𝐝𝐞̂̉ 𝐱𝐞𝐦 𝐚𝐥𝐥 𝐥𝐞̣̂𝐧𝐡 𝐜𝐮̉𝐚 𝐁𝐎𝐓. \n𝐒𝐩𝐚𝐦, 𝐢𝐛 𝐁𝐎𝐓, 𝐤𝐢𝐜𝐤 𝐁𝐎𝐓 = 𝐎𝐮𝐭 𝐁𝐎𝐗, 𝐛𝐚𝐧 𝐁𝐎𝐗. \n𝐗𝐢𝐧 𝐁𝐎𝐓 𝐢𝐛 𝐀𝐝𝐦𝐢𝐧: https://www.facebook.com/profile.php?id=100052097501614. \n𝐁𝐎𝐓 𝐧𝐚̀𝐲 𝐥𝐨̣𝐜 𝐥𝐞̣̂𝐧𝐡 𝐫𝐨̂̀𝐢, 𝐱𝐢𝐧 𝐦𝐚̀ 𝐜𝐡𝐞̂ 𝐭𝐡𝐢̀ 𝐤𝐡𝐨̉𝐢 𝐬𝐚̀𝐢 = 𝐎𝐮𝐭 + 𝐁𝐚𝐧. \n𝐏𝐥𝐞𝐚𝐬𝐞 𝐮𝐬𝐞 𝐛𝐨𝐭. 𝐓𝐡𝐚𝐧𝐤`, attachment: fs.createReadStream(__dirname + "/cache/joinbox/joinbox.mp4")} ,threadID));
	}
	else {
		try {
			const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);

			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			const path = join(__dirname, "cache", "joinGif");
			const pathGif = join(path, `join.mp4`);

			var mentions = [], nameArray = [], memLength = [], i = 0;
			
			for (id in event.logMessageData.addedParticipants) {
				const userName = event.logMessageData.addedParticipants[id].fullName;
				nameArray.push(userName);
				mentions.push({ tag: userName, id });
				memLength.push(participantIDs.length - i++);
			}
			memLength.sort((a, b) => a - b);
			
			(typeof threadData.customJoin == "undefined") ? msg = "𝘾𝙝𝙖̀𝙤 𝙈𝙪̛̀𝙣𝙜 𝘽𝙖̣𝙣 {name}.\n 𝙏𝙤̛́𝙞 𝙑𝙤̛́𝙞 𝙉𝙝𝙤́𝙢 {threadName}.\n{type} 𝙇𝙖̀ 𝙏𝙝𝙖̀𝙣𝙝 𝙑𝙞𝙚̂𝙣 𝙔𝙚̂𝙪 𝘿𝙖̂́𝙪 𝙉𝙝𝙖̂́𝙩 𝙏𝙝𝙪̛́ {soThanhVien} 𝘾𝙪̉𝙖 𝘽𝙊𝙏 🥲" : msg = threadData.customJoin;
			msg = msg
			.replace(/\{name}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  'các bạn' : 'bạn')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
			.replace(/\{threadName}/g, threadName);

			if (existsSync(path)) mkdirSync(path, { recursive: true });

			const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));

			if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
			else if (randomPath.length != 0) {
				const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
				formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
			}
			else formPush = { body: msg, mentions }

			return api.sendMessage(formPush, threadID);
		} catch (e) { return console.log(e) };
	}
}
