const axios = require('axios');
const papa = require('papaparse');
const fs = require('fs');

module.exports = {
	getFiles: async function (req, res, next) {
		//1) Se deben llamar al listado de archivos /v1/secret/files
		try {
			const apiResponse = await axios({
				method: 'get',
				url: process.env.BASE_URL + '/files',
				headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` },
			});
			const files = apiResponse.data.files;
			console.log('%cfilesController.js line:15 files', 'color: white; background-color: #007acc;', files);

			// 2) Descargar cada file usando /v1/secret/file/{file}
			const fileErrors = [];
			files.forEach(async (file) => {
				try {
					const csvFile = await axios({
						method: 'get',
						url: process.env.BASE_URL + '/file/' + file,
						headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` },
						responseType: 'blob',
					});
					if (csvFile.data) {
						const path = `${__dirname}/../files/${file}`;
						fs.writeFileSync(path, csvFile.data);
					} else {
						fileErrors.push(file);
					}
				} catch (error) {
					fileErrors.push({ file: file, code: error.code, url: error.config.url });
					console.log(fileErrors);
				}
			});
			//////******** */
		} catch (error) {
			console.error(error);
		}
	},
	// 2) Descargar cada file usando /v1/secret/file/{file}
	downloadAllFiles: async function (req, res, next) {
		// try {
		// 	const apiResponse = await axios({
		// 		method: 'get',
		// 		url: 'https://echo-serv.tbxnet.com/v1/secret/file/',
		// 		headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` },
		// 	});
		// 	res.send(apiResponse.data.files);
		// } catch (error) {
		// 	res.send(error.code);
		// }
	},
	returnFiles: async function (req, res, next) {
		// try {
		// 	const apiResponse = await axios({
		// 		method: 'get',
		// 		url: 'https://echo-serv.tbxnet.com/v1/secret/files',
		// 		headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` },
		// 	});
		// 	res.send(apiResponse.data.files);
		// } catch (error) {
		// 	res.send(error.code);
		// }
	},
};
