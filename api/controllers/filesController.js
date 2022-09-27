const axios = require('axios')
const papa = require('papaparse')
const fs = require('fs')
const path = require('path')

module.exports = {
  availableEndpoints: async function (req, res, next) {
    res.send({
      availableEndpoints: {
        '/files': 'GET all files',
        '/files/data': 'GET all valid files and save to CSV'
      }
    })
  },
  getFiles: async function (req, res, next) {
    // definitions
    let files = []
    // 1) Se deben llamar al listado de archivos /v1/secret/files
    try {
      const apiResponse = await axios({
        method: 'get',
        url: process.env.BASE_URL + '/files',
        headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` }
      })
      files = [...apiResponse.data.files]
      res.send(files)
    } catch (error) {
      console.log(error)
    }
  },
  getAndTransformFiles: async function (req, res, next) {
    // definitions
    let files = []
    const fileErrors = []
    const filteredFiles = []
    const rawCSV = []
    let filteredCSV = []
    let fields = 0

    // 1) Se deben llamar al listado de archivos /v1/secret/files
    try {
      const apiResponse = await axios({
        method: 'get',
        url: process.env.BASE_URL + '/files',
        headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` }
      })
      files = [...apiResponse.data.files]
    } catch (error) {
      console.log(error)
    }

    // 2) Descargar cada file usando /v1/secret/file/{file}
    for (const file of files) {
      try {
        const csvFile = await axios({
          method: 'get',
          url: process.env.BASE_URL + '/file/' + file,
          headers: { Authorization: `Bearer ${process.env.BEARER_TOKEN}` },
          responseType: 'blob'
        })
        if (csvFile.data) {
          const filePath = path.resolve(__dirname, `../files/${file}`)
          fs.writeFileSync(filePath, csvFile.data)
        }
      } catch (error) {
        fileErrors.push({ file, code: error.code, url: error.config.url })
      }
    }
    // 3) Formatear la información en los CSV
    for (const file of files) {
      const index = fileErrors.findIndex((object) => {
        return object.file === file
      })
      if (index === -1) {
        filteredFiles.push(file)
      }
    }
    for (const file of filteredFiles) {
      const filePath = path.resolve(__dirname, `../files/${file}`)
      const csv = fs.readFileSync(filePath, 'utf8')
      papa.parse(csv, {
        header: true,
        complete: (parsed) => {
          rawCSV.push(parsed)
        }
      })
    }

    for (const row of rawCSV) {
      fields = row.meta.fields.length
      for (const col of row.data) {
        const a = Object.keys(col).length
        const b = []
        if (a === fields) {
          b.push(col)
        }
        filteredCSV.push(b)
        filteredCSV = filteredCSV.flat()
      }
    }

    // native groupBy function
    const groupBy = function (xs, key) {
      return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x)
        return rv
      }, {})
    }
    let grouped = groupBy(filteredCSV, 'file')
    // prepare for save
    grouped = Object.values(grouped)

    // 4) Guardar los CSV en la base de datos
    for (const file of grouped) {
      const csv = papa.unparse(file)
      const filePath = path.resolve(__dirname, `../files/${file[0].file}`)
      fs.writeFileSync(filePath, csv)
    }
    res.send(grouped)
  }
}
