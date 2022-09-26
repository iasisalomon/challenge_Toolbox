const axios = require('axios');

module.exports = {
	getFiles: async function (req, res, next) {
		const asd = await axios({
			method: 'get',
			url: 'https://bit.ly/2mTM3nY',
			headers: { Authorization: `Bearer +${}` },
		});
	},
};
