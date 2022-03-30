const fs = require('fs')
const { promisify } = require('util')
const path = require('path')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const dbPath = path.join(__dirname,'./db.json')
//读取文件
exports.getDb = async () =>{
    const data = await readFile('./db.json','utf8')
    return JSON.parse(data)
}

//保存文件
exports.saveDb = async db =>{
    const data = JSON.stringify(db,null,'  ')
    await writeFile(dbPath,data)
}