// // 创建音乐列表路由表  调用封装的对musicList操作的方法
const multer = require('multer')
const fs=require('fs');
const path=require('path');
const musicRouter = require('express').Router()
var music = require('../controller/musicListController');
const { log } = require('console');
musicRouter
.get('/queryAllMusic',music.getAllMusic)
.get('/querySingleMusic',music.getSingMusic)
.delete('/deleteSingMusic',music.deleteSingMusic)
.post('/addSingMusic',music.addSingMusic)
.post('/editSingMusic',music.editSingMusic)
.post('/upload',multer({dest:'upload'}).single('file'),(req,res)=>{
    console.log(req.file);
    //读取文件路径
    fs.readFile(req.file.path,(err,data)=>{
        //如果读取失败
    if(err){return res.send('上传失败')}
    //如果读取成功
    //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let time=Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
    //拓展名
    let extname=req.file.mimetype.split('/')[1]
    //拼接成图片名
    let keepname= time+'.'+extname
    //三个参数
    //1.图片的绝对路径
    //2.写入的内容
    //3.回调函数
    fs.writeFile(path.join(__dirname,'../public/img/'+keepname),data,(err)=>{
        if(err){return res.send('写入失败')}
        res.send({err:0,msg:'上传ok',data:'/img/'+keepname})
    });
 })
    })
module.exports = musicRouter
