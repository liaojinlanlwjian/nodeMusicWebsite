const { get } = require('express/lib/response')
var dbConfig = require('../util/dbconfig')
//封装对用户喜欢列表表的操作
//获取用户全部喜欢
getAllLike = (req,res)=>{
    let {user} = req.query
    var sqlByPage = 'select * from mylike where user=?'
    var sqlArrByPage = [user]
    var callBackByPagr = (err,data)=>{
    if (err) {
        console.log('出错了');
        return
    }
    res.send({
        data
    })
}
dbConfig.sqlConnect(sqlByPage,sqlArrByPage,callBackByPagr)
}
// 删除单个喜欢
deleteMyLike = (req,res)=>{
    let {musicId} = req.query
    var sql = `delete from mylike where musicId=?`;
    var sqlArr = [musicId]
    var callBack = (err,data)=>{
        if (err) {
            console.log('出错了');
            return
        }
        res.send({
            data
        })
    }
        dbConfig.sqlConnect(sql,sqlArr,callBack)
}
// 增加单个用户信息
addMylike = (req,res)=>{
    var name = req.body.musicName
    var singer = req.body.musicSinger
    var cover = req.body.musicCover
    var api = req.body.musicApi
    var traffic = req.body.musicTraffic
    var down = req.body.musicDownloads
    var author = req.body.musicAuthor
    var describe = req.body.des
    var msg = req.body.musicMsg
    var type = req.body.musicType
    var status = req.body.musicStatus
    var musicId = req.body.musicId
    var user = req.body.user
    // var id = req.body.id
    //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let id = Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
    var sql = "insert into mylike (id,musicName,musicSinger,musicCover,musicApi,musicTraffic,musicDownloads,musicAuthor,des,musicMsg,musicType,musicStatus,musicId,user) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var sqlArr = [id,name,singer,cover,api,traffic,down,author,describe,msg,type,status,musicId,user];
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
module.exports = {
    getAllLike,
    deleteMyLike,
    addMylike
}