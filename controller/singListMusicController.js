var dbConfig = require('../util/dbconfig')
//封装对歌单歌曲表的操作
//获取全部该歌单的全部歌曲
getSingListMusic = (req,res)=>{
    let {user,singListId} = req.query
    var sqlByPage = 'select * from singlistmusic where user=? and singListId=?'
    var sqlArrByPage = [user,singListId]
    var callBackByPagr = (err,data)=>{
    if (err) {
        console.log(err);
        console.log('出错了');
        return
    }
    res.json({
        data
    })
}
dbConfig.sqlConnect(sqlByPage,sqlArrByPage,callBackByPagr)
}
//获取用户的所有歌单
getAllListMusic = (req,res)=>{
    let {user} = req.query
    var sqlByPage = 'select * from singlistmusic where user=? '
    var sqlArrByPage = [user]
    var callBackByPagr = (err,data)=>{
    if (err) {
        console.log(err);
        console.log('出错了');
        return
    }
    res.json({
        data
    })
}
dbConfig.sqlConnect(sqlByPage,sqlArrByPage,callBackByPagr)
}
// 删除单个歌单歌曲信息
deleteSingListMusic = (req,res)=>{
    let {id} = req.query
    console.log(id);
    var sql = `delete from singlistmusic where id=?`;
    var sqlArr = [id]
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
// 增加单个音乐进入歌单
addSingListMusic = (req,res)=>{
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
    var user = req.body.user
    var musicId = req.body.musicId
    var singListId = req.body.singListId
    //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let id = Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
    var sql = "insert into singlistmusic (id,musicName,musicSinger,musicCover,musicApi,musicTraffic,musicDownloads,musicAuthor,des,musicMsg,musicType,musicStatus,user,musicId,singListId) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    var sqlArr = [id,name,singer,cover,api,traffic,down,author,describe,msg,type,status,user,musicId,singListId];
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
    addSingListMusic,
    getSingListMusic,
    deleteSingListMusic,
    getAllListMusic
}