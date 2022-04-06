var dbConfig = require('../util/dbconfig')

const res = require('express/lib/response')
//封装对use表的操作
//获取全部音乐
getAllMusic = (req,res)=>{
    let {start} = req.query
    var sqlByPage = 'select * from musicList limit ?,5'
    var sqlArrByPage = [parseInt(start)]
    var callBackByPagr = (err,data)=>{
    if (err) {
        console.log('出错了');
        return
    }
    var sql = 'select count(*) as total from musicList';
        var sqlArr = []
        var callBack = (err,dataTotal)=>{
            if (err) {
                console.log('出错了');
                return
            }
            res.json({
                result: 1,
                status: 200,
                message: "success",
                data: data,
                paging: {
                    total: dataTotal
                }
            })
        }
        dbConfig.sqlConnect(sql,sqlArr,callBack)
}
dbConfig.sqlConnect(sqlByPage,sqlArrByPage,callBackByPagr)
}
// 获取歌手音乐信息
getSingerMusic = (req,res)=>{
    console.log(req);
    let {singerName} = req.query
    console.log(singerName);
    var sql = `select * from musicList where musicSinger=?`;
    var sqlArr = [singerName]
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
// 获取搜索音乐信息
getSearchMusic = (req,res)=>{
    let {value} = req.query
    console.log(req.query);
    var sql = `select * from musicList where musicName=?`;
    var sqlArr = [value]
    var callBack = (err,data)=>{
        if (err) {
            console.log('出错了');
            return
        }
        console.log(data);
        if (data.length == 0) {
            var sqlSinger = `select * from musicList where musicSinger=?`;
            var sqlArrSinger = [value]
            var callBackSinger = (err,data)=>{
                if (err) {
                    console.log('出错了');
                    return
                }
                console.log(data);
                    res.send({
                        data
                    })
            }
                dbConfig.sqlConnect(sqlSinger,sqlArrSinger,callBackSinger)
        }
        else{
            res.send({
                data
            })
        }
        
    }
        dbConfig.sqlConnect(sql,sqlArr,callBack)
}
// 获取单个音乐信息
getSingMusic = (req,res)=>{
    let {id} = req.query
    var sql = `select * from musicList where id=?`;
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
// 删除单个音乐信息
deleteSingMusic = (req,res)=>{
    let {id} = req.query
    console.log(id);
    var sql = `delete from musicList where id=?`;
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
// 增加单个音乐信息
addSingMusic = (req,res)=>{
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
    //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let id = Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
    var sql = "insert into musicList (id,musicName,musicSinger,musicCover,musicApi,musicTraffic,musicDownloads,musicAuthor,des,musicMsg,musicType,musicStatus) values(?,?,?,?,?,?,?,?,?,?,?,?)";
    var sqlArr = [id,name,singer,cover,api,traffic,down,author,describe,msg,type,status];
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
//修改单个音乐信息
editSingMusic = (req,res)=>{
    var id = req.body.id
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
    var sql = `update musicList set musicName=?,musicSinger=?,musicCover=?,musicApi=?,musicTraffic=?,musicDownloads=?,musicAuthor=?,des=?,musicMsg=?,musicType=?,musicStatus=? where id=?`;
    var sqlArr = [name,singer,cover,api,traffic,down,author,describe,msg,type,status,id];
    var callBack = (err,data)=>{
        if (err) {
            console.log('出错了');
            res.json({
                status:500,
                msg:'更新失败'
            })
            return
        }
        res.json({
            data,
            status:200,
            msg:'更新成功'
        })
    }
        dbConfig.sqlConnect(sql,sqlArr,callBack)
}
module.exports = {
    getAllMusic,
    getSingMusic,
    deleteSingMusic,
    addSingMusic,
    editSingMusic,
    getSingerMusic,
    getSearchMusic
}