const axios = require('axios');

module.exports = {
	getFiles: async function (req, res, next) {
		try {
			const asd = await axios({
				method: 'get',
				url: 'https://echo-serv.tbxnet.com/v1/secret/files',
				headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` },
			});
			res.send(asd.data);
		} catch (error) {
			res.send(error.code);
		}
	},
};
