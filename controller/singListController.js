const { get } = require('express/lib/response')
var dbConfig = require('../util/dbconfig')
//封装对歌单表的操作
//获取全部歌单
getAllSingList = (req,res)=>{
    let {user} = req.query
    var sqlByPage = 'select * from singlist where user=?'
    var sqlArrByPage = [user]
    var callBackByPagr = (err,data)=>{
    if (err) {
        console.log('出错了');
        return
    }
    console.log(data);
    res.json({
        data:data
    })
}
dbConfig.sqlConnect(sqlByPage,sqlArrByPage,callBackByPagr)
}
// 删除单个歌单
deleteSingList = (req,res)=>{
    let {id} = req.query
    var sql = `delete from singlist where id=?`;
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
// 增加单个歌单
addSingList = (req,res)=>{
    var name = req.body.name
    var cover = req.body.cover
    var user = req.body.user
    var time = req.body.time
    var by = req.body.by
    //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let id = Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
    var sql = "insert into singlist (id,name,user,created_by,created_time,cover) values(?,?,?,?,?,?)";
    var sqlArr = [id,name,user,by,time,cover];
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
//查询单个歌单信息
seacrSingList = (req,res)=>{
    let {id} = req.query
    var sql = 'select * from singlist where id=?'
    var sqlArr = [id]
    var callBack = (err,data)=>{
        if (err) {
            console.log('出错了');
            res.json({
                status:500,
                msg:'查询失败'
            })
            return
        }
        res.json({
            status:200,
            msg:'查询成功',
            data
        })
    }
        dbConfig.sqlConnect(sql,sqlArr,callBack)
}
module.exports = {
    getAllSingList,
    deleteSingList,
    addSingList,
    seacrSingList
}