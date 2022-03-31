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
// 删除单个用户信息
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
    var value = req.body.value
    var user = req.body.user
    //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let id = Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
    var sql = "insert into singlist (id,name,value,user) values(?,?,?,?)";
    var sqlArr = [id,name,value,user];
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
//修改单个用户信息
editSingList = (req,res)=>{
    var id = req.body.id
    var name = req.body.name
    var value = req.body.value
    var user = req.body.user
    // let {id} = req.query
    var sql = `update singlist set name=?,value=?,user=? where id=?`;
    var sqlArr = [name,value,user,id]
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
    getAllSingList,
    deleteSingList,
    addSingList,
    editSingList
}