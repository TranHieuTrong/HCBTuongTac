const chalk = require('chalk');

module.exports = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.yellow('[ ❕ Lỗi rồi ] » ') + data);
			break;
		case "error":
			console.log(chalk.red('[ ❕ Lỗi rồi ] » ') + data);
			break;
		default:
			console.log(chalk.magenta(`${option} » `) + data);
			break;
	}
}

module.exports.loader = (data, option) => {
	switch (option) {
		case "warn":
			console.log(chalk.yellow('[𝙃𝘾𝙝𝙤𝙣𝙜2004 ] » ') + data);
			break;
		case "error":
			console.log(chalk.red('[𝙃𝘾𝙝𝙤𝙣𝙜2004 ] » ') + data);
			break;
		default:
			console.log(chalk.green(`[𝙃𝘾𝙝𝙤𝙣𝙜2004 ] » `) + data);
			break;
	}
}