const axios = require('axios');
const papa = require('papaparse');
const fs = require('fs');

module.exports = {
	getFiles: async function (req, res, next) {
		//definitions
		let files = [];
		//1) Se deben llamar al listado de archivos /v1/secret/files
		try {
			const apiResponse = await axios({
				method: 'get',
				url: process.env.BASE_URL + '/files',
				headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` },
			});
			files = [...apiResponse.data.files];
			res.send(files);
		} catch (error) {
			console.log(error);
		}
	},
	getAndTransformFiles: async function (req, res, next) {
		//definitions
		let files = [];
		const fileErrors = [];
		let filteredFiles = [];
		let rawCSV = [];
		let filteredCSV = [];
		let fields = 0;

		//1) Se deben llamar al listado de archivos /v1/secret/files
		try {
			const apiResponse = await axios({
				method: 'get',
				url: process.env.BASE_URL + '/files',
				headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` },
			});
			files = [...apiResponse.data.files];
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

		for (let row of rawCSV) {
			fields = row.meta.fields.length;
			for (let col of row.data) {
				let a = Object.keys(col).length;
				let b = [];
				if (a === fields) {
					b.push(col);
				}
				filteredCSV.push(b);
				filteredCSV = filteredCSV.flat();
			}
		}

		//native groupBy function
		var groupBy = function (xs, key) {
			return xs.reduce(function (rv, x) {
				(rv[x[key]] = rv[x[key]] || []).push(x);
				return rv;
			}, {});
		};
		var grouped = groupBy(filteredCSV, 'file');
		//prepare for save
		grouped = Object.values(grouped);

		// 4) Guardar los CSV en la base de datos
		for (let file of grouped) {
			let csv = papa.unparse(file);
			const path = `${__dirname}/../formattedFiles/${file[0].file}`;
			fs.writeFileSync(path, csv);
		}
		res.send(grouped);
	},
};
