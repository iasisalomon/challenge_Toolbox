const axios = require('axios');
const papa = require('papaparse');
const fs = require('fs');

module.exports = {
	getFiles: async function (req, res, next) {
		//definitions
		let files = [];
		const fileErrors = [];
		let filteredFiles = [];
		let rawCSV = [];
		let filteredCSV = [];

		//1) Se deben llamar al listado de archivos /v1/secret/files
		try {
			const apiResponse = await axios({
				method: 'get',
				url: process.env.BASE_URL + '/files',
				headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` },
			});
			files = [...apiResponse.data.files];
			console.log('File names --> ' + files);
		} catch (error) {
			console.log(error);
		}

		// 2) Descargar cada file usando /v1/secret/file/{file}
		for (let file of files) {
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
				}
			} catch (error) {
				fileErrors.push({ file: file, code: error.code, url: error.config.url });
			}
		}
		// 3) Formatear la información en los CSV
		for (let file of files) {
			const index = fileErrors.findIndex((object) => {
				return object.file === file;
			});
			if (index === -1) {
				filteredFiles.push(file);
			}
		}
		for (let file of filteredFiles) {
			const path = `${__dirname}/../files/${file}`;
			const csv = fs.readFileSync(path, 'utf8');
			papa.parse(csv, {
				header: true,
				complete: (parsed) => {
					rawCSV.push(parsed);
				},
			});
		}

		// 4) Enviar la información formateada
		for (let csv of rawCSV) {
			if (csv.errors.length > 0) {
				for (let errors in csv.errors){
					
				}

		res.send(csv);
	},
};
