const { get } = require('express/lib/response')
var dbConfig = require('../util/dbconfig')
//封装对mv表的操作
//获取全部MV
getAllMvByPage = (req,res)=>{
    let {start} = req.query
    var sqlByPage = 'select * from mvlist limit ?,5'
    var sqlArrByPage = [parseInt(start)]
    var callBackByPagr = (err,data)=>{
    if (err) {
        console.log('出错了');
        return
    }
    var sql = 'select count(*) as total from mvlist';
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
getAllMv = (req,res)=>{
    var sqlByPage = 'select * from mvlist'
    var sqlArrByPage = []
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
// 获取单个MV信息
getSingMv = (req,res)=>{
    let {id} = req.query
    var sql = `select * from mvlist where id=?`;
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
// 删除单个MV信息
deleteSingMv = (req,res)=>{
    let {id} = req.query
    var sql = `delete from mvlist where id=?`;
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
// 增加单个MV信息
addSingMv = (req,res)=>{
    var name = req.body.mvName
    var author = req.body.mvAuthor
    var traffic = req.body.mvTraffic
    var msg = req.body.mvMsg
    var type = req.body.mvType
    var api = req.body.mvApi
    var cover = req.body.mvCover
    //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let id = Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
    var sql = "insert into mvlist (id,mvName,mvApi,mvAuthor,mvTraffic,mvMsg,mvType,mvCover) values(?,?,?,?,?,?,?,?)";
    var sqlArr = [id,name,api,author,traffic,msg,type,cover];
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
//修改单个MV信息
editSingMv = (req,res)=>{
    var MvId = req.body.id
    var name = req.body.mvName
    var author = req.body.mvAuthor
    var traffic = req.body.mvTraffic
    var msg = req.body.mvMsg
    var type = req.body.mvType
    var api = req.body.mvApi
    var cover = req.body.mvCover
    // let {id} = req.query
    var sql = `update mvlist set mvName=?,mvAuthor=?,mvTraffic=?,mvMsg=?,mvType=?,mvApi=?,mvCover=? where id=?`;
    var sqlArr = [name,author,traffic,msg,type,api,cover,MvId]
    var callBack = (err,data)=>{
        if (err) {
            console.log('出错了');
            res.json({
                status:500,
                msg:'更新失败'
            })
            return
        }
        console.log(data);
        res.json({
            status:200,
            msg:'更新成功'
        })
    }
        dbConfig.sqlConnect(sql,sqlArr,callBack)
}
module.exports = {
    getAllMv,
    getAllMvByPage,
    getSingMv,
    deleteSingMv,
    addSingMv,
    editSingMv,
}