const { query } = require('express')
var dbConfig = require('../util/dbconfig')
// 增加单个最近播放
addRecentMusic = (req,res)=>{
    let {id} = req.query
    var sqlByPage = 'select count(*) from recentplay where id= ?'
    var sqlArrByPage = [id]
    var callBackByPagr = (err,data)=>{
    if (err) {
        console.log('出错了');
        return
    }
    else{
        if (data == 0) {
            res.send({
                msg:'已存在'
            })
            return 
        }
        var name = req.body.musicName
        var singer = req.body.musicSinger
        var cover = req.body.musicCover
        var api = req.body.musicApi
        var user = req.body.user
        var id = req.body.id
        //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
        // let id = Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
        var sql = "insert into recentplay (id,name,singer,cover,api,user) values(?,?,?,?,?,?)";
        var sqlArr = [id,name,singer,cover,api,user];
        var callBack = (err,data)=>{
            if (err) {
                res.send({
                    msg:'已存在'
                })
                console.log('已存在');
                return
            }
            res.send({
                data
            })
        }
        dbConfig.sqlConnect(sql,sqlArr,callBack)
               
    }
}
dbConfig.sqlConnect(sqlByPage,sqlArrByPage,callBackByPagr)
}
// 获取单个最近播放
getSingRecentMusic = (req,res)=>{
    let {id} = req.query
    var sql = `select * from recentplay where id=?`;
    var sqlArr = [id]
    var callBack = (err,data)=>{
        if (err) {
            console.log(err);
            console.log('出错了');
            return
        }
        res.send({
            data
        })
    }
    dbConfig.sqlConnect(sql,sqlArr,callBack)
}
// 获取所有最近播放
getAllRecentMusic = (req,res)=>{
    var sql = `select * from recentplay`;
    var sqlArr = []
    var callBack = (err,data)=>{
        if (err) {
            console.log(err);
            console.log('出错了');
            return
        }
        res.json({
            data
        })
    }
    dbConfig.sqlConnect(sql,sqlArr,callBack)
}
//查找下一首歌曲
queryNextSing = (req,res)=>{
    let {id} = req.query
    var sql = `select * from recentplay where id = (select max(id) from recentplay where id > ?);`;
    var sqlArr = [id]
    var callBack = (err,data)=>{
        if (err) {
            console.log(err);
            console.log('出错了');
            return
        }
        if (data.length == 0) {
            var frsql = 'select * from recentplay limit 1'
            var frsqlArr = []
            var frcallBack = (err,data)=>{
                if (err) {
                    console.log(err);
                    console.log('出错了');
                    return
                }
                res.json({
                    data,
                    status:200,
                    msg:'暂无下一首,自动切换成第一首'
                })
            }
            dbConfig.sqlConnect(frsql,frsqlArr,frcallBack) 
            return
        }
        res.send({
            data
        })
    }
    dbConfig.sqlConnect(sql,sqlArr,callBack) 
}
//查找上一首歌曲 
queryUpxtSing = (req,res)=>{
    let {id} = req.query
    var sql = `select * from recentplay where id = (select max(id) from recentplay where id < ?);`;
    var sqlArr = [id]
    var callBack = (err,data)=>{
        if (err) {
            console.log(err);
            console.log('出错了');
            return
        }
        if (data.length == 0) {
            var frsql = 'select * from recentplay where id = (select max(id) from recentplay where id > ?);'
            var frsqlArr = [id]
            var frcallBack = (err,data)=>{
                if (err) {
                    console.log(err);
                    console.log('出错了');
                    return
                }
                res.json({
                    data,
                    status:200,
                    msg:'暂无上一首,自动切换成下一首'
                })
            }
            dbConfig.sqlConnect(frsql,frsqlArr,frcallBack) 
            return
        }
        res.send({
            data
        })
    }
    dbConfig.sqlConnect(sql,sqlArr,callBack)
}
module.exports = {
    addRecentMusic,
    getSingRecentMusic,
    queryNextSing,
    queryUpxtSing,
    getAllRecentMusic
}