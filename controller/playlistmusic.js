var dbConfig = require('../util/dbconfig')

const res = require('express/lib/response')
//封装对歌单音乐表的操作
//获取全部歌单音乐
getAllplaylistmusic = (req,res)=>{
    let {playListId} = req.query
    var sqlByPage = 'select * from playlist_recommend_music where playListId=?'
    var sqlArrByPage = [playListId]
    var callBackByPagr = (err,data)=>{
    if (err) {
        console.log(err);
        console.log('出错了');
        return
    }
    res.send({
        data
    })
}
dbConfig.sqlConnect(sqlByPage,sqlArrByPage,callBackByPagr)
}
// 删除单个歌单音乐信息
deleteSingplaylistmusic = (req,res)=>{
    let {id} = req.query
    console.log(id);
    var sql = `delete from playlist_recommend_music where id=?`;
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
// 增加单个歌单音乐信息
addSingplaylistmusic = (req,res)=>{
    let data = req.body
    for (let i = 0; i <= data.length; i++) {
        if (i < data.length) {
        var name = data[i].musicName
        var singer = data[i].musicSinger
        var cover = data[i].musicCover
        var api = data[i].musicApi
        var traffic = data[i].musicTraffic
        var down = data[i].musicDownloads
        var author = data[i].musicAuthor
        var describe = data[i].des
        var msg = data[i].musicMsg
        var type = data[i].musicType
        var status = data[i].musicStatus
        //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
        let musicId = data[i].id
        let playListId = data[i].playListId
        let id = Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
        var sql = "insert into playlist_recommend_music (id,musicName,musicSinger,musicCover,musicApi,musicTraffic,musicDownloads,musicAuthor,des,musicMsg,musicType,musicStatus,musicId,playListId) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        var sqlArr = [id,name,singer,cover,api,traffic,down,author,describe,msg,type,status,musicId,playListId];
        var callBack = (err,data)=>{
            if (err) {
                console.log(err);
                console.log('出错了');
                return
            }
        }
        dbConfig.sqlConnect(sql,sqlArr,callBack)
        }else{
            res.send({
                msg:'success'
            })
            return
        }
    }
}
module.exports = {
    getAllplaylistmusic,
    addSingplaylistmusic,
    deleteSingplaylistmusic,
}