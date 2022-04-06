var dbConfig = require('../util/dbconfig')

const res = require('express/lib/response')
//封装对推荐歌单表的操作
//获取分页推荐歌单
getAllplaylistcommend = (req,res)=>{
    let {start} = req.query
    var sqlByPage = 'select * from playlist_recommended limit ?,5'
    var sqlArrByPage = [parseInt(start)]
    var callBackByPagr = (err,data)=>{
    if (err) {
        console.log(err);
        console.log('出错了');
        return
    }
    var sql = 'select count(*) as total from playlist_recommended';
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
//获取全部推荐歌单
queryAllplaylistcommend = (req,res)=>{
    var sqlByPage = 'select * from playlist_recommended'
    var sqlArrByPage = []
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
// 获取单个推荐歌单信息
getSingplaylistcommend = (req,res)=>{
    let {id} = req.query
    var sql = `select * from playlist_recommended where id=?`;
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
// 删除单个推荐歌单信息
deleteSingplaylistcommend = (req,res)=>{
    let {id} = req.query
    console.log(id);
    var sql = `delete from playlist_recommended where id=?`;
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
// 增加单个推荐歌单信息
addSingplaylistcommend = (req,res)=>{
    var cover = req.body.cover
    var msg = req.body.msg
    var name = req.body.name
    var time = req.body.time
    var user = req.body.user
    //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let id = Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
    var sql = "insert into playlist_recommended (id,name,created_by,created_time,cover,msg) values(?,?,?,?,?,?)";
    var sqlArr = [id,name,user,time,cover,msg];
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
//修改单个推荐歌单信息
editSingplaylistcommend = (req,res)=>{
    var id = req.body.id
    var cover = req.body.cover
    var msg = req.body.msg
    var name = req.body.name
    var sql = `update playlist_recommended set name=?,cover=?,msg=? where id=?`;
    var sqlArr = [name,cover,msg,id];
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
    getAllplaylistcommend,
    getSingplaylistcommend,
    deleteSingplaylistcommend,
    addSingplaylistcommend,
    editSingplaylistcommend,
    queryAllplaylistcommend
}