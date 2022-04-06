const { get } = require('express/lib/response')
var dbConfig = require('../util/dbconfig')
//封装对singer表的操作
//分页获取歌手数据
queryByPageSinger = (req,res)=>{
    let {start} = req.query
    var sqlByPage = 'select * from singer limit ?,5'
    var sqlArrByPage = [parseInt(start)]
    var callBackByPagr = (err,data)=>{
    if (err) {
        console.log('出错了');
        return
    }
    var sql = 'select count(*) as total from singer';
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
//获取所有的歌手数据
queryAllSinger = (req,res)=>{
    var sql = 'select * from singer';
        var sqlArr = []
        var callBack = (err,data)=>{
            if (err) {
                console.log('出错了');
                return
            }
            res.json({
                result: 1,
                status: 200,
                message: "success",
                data: data,
            })
        }
        dbConfig.sqlConnect(sql,sqlArr,callBack)
}
// 获取单个歌手信息
getSinger = (req,res)=>{
    let {id} = req.query
    var sql = `select * from singer where id=?`;
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
// 删除单个歌手信息
deleteSinger = (req,res)=>{
    let {id} = req.query
    var sql = `delete from singer where id=?`;
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
// 增加单个歌手信息
addSinger = (req,res)=>{
    var name = req.body.singer_name
    var msg = req.body.singer_msg
    var src = req.body.src
    var place = req.body.singer_place
    var user = req.body.user
    var time = req.body.time
    //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let id = Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
    var sql = "insert into singer (id,singer_name,singer_msg,singer_pic,singer_place,create_by,create_time) values(?,?,?,?,?,?,?)";
    var sqlArr = [id,name,msg,src,place,user,time];
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
//修改单个歌手信息
editSinger = (req,res)=>{
    console.log(req.body);
    var id = req.body.id
    var name = req.body.singer_name
    var msg = req.body.singer_msg
    var src = req.body.src
    var place = req.body.singer_place
    var user = req.body.user
    var time = req.body.time
    // let {id} = req.query
    var sql = `update singer set singer_name=?,singer_msg=?,singer_pic=?,singer_place=?,create_by=?,create_time=? where id=?`;
    var sqlArr = [name,msg,src,place,user,time,id];
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
            status:200,
            msg:'更新成功'
        })
    }
        dbConfig.sqlConnect(sql,sqlArr,callBack)
}
module.exports = {
    queryByPageSinger,
    getSinger,
    deleteSinger,
    addSinger,
    editSinger,
    queryAllSinger
}