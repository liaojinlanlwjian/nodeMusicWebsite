const { get } = require('express/lib/response')
var dbConfig = require('../util/dbconfig')
//封装对muaicUse表的操作
//获取全部音乐网站用户
getAllMusicUser = (req,res)=>{
    let {start} = req.query
    var sqlByPage = 'select * from users limit ?,5'
    var sqlArrByPage = [parseInt(start)]
    var callBackByPagr = (err,data)=>{
    if (err) {
        console.log('出错了');
        return
    }
    var sql = 'select count(*) as total from users';
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
// 获取单个音乐网站用户信息
getSingUser = (req,res)=>{
    let {id} = req.query
    var sql = `select * from users where id=?`;
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
// 删除单个音乐网站用户信息
deleteSingUser = (req,res)=>{
    let {id} = req.query
    var sql = `delete from users where id=?`;
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
// 增加单个音乐网站用户信息
addSingMusicUser = (req,res)=>{
    var userName = req.body.name
    var userAccount = req.body.acc
    var userSex = req.body.sex
    var userTel = req.body.tel
    var userAdress = req.body.adress
    var userPsd = req.body.psd
    var userSrc = req.body.src
    //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let id = Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
    var sql = "insert into ecroll (id,name,acc,sex,tel,adress,psd,src) values(?,?,?,?,?,?,?,?)";
    var sqlArr = [id,userName,userAccount,userSex,userTel,userAdress,userPsd,userSrc,];
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
editSingUser = (req,res)=>{
    var userId = req.body.id
    var userName = req.body.name
    var userTel = req.body.tel
    var userSex = req.body.sex
    var userAdress = req.body.adress
    var userRole = req.body.role
    var userWork = req.body.work
    var userPsd = req.body.psd
    var userDescribe = req.body.des
    var userAccount = req.body.acc
    // let {id} = req.query
    var sql = `update users set name=?,tel=?,sex=?,adress=?,role=?,work=?,psd=?,des=?,acc=? where id=?`;
    var sqlArr = [userName,userTel,userSex,userAdress,userRole,userWork,userPsd,userDescribe,userAccount,userId]
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
//登录验证音乐网站用户信息
loginVerifyMusicUser = (req,res)=>{
    let {acc,psd} = req.query
    console.log(acc);
    console.log(psd);
    var sql = 'select * from ecroll where acc=? and psd=?';
        var sqlArr = [acc,psd]
        var callBack = (err,data)=>{
            if (err) {
                console.log('出错了');
                return
            }
            if (data.length == 0) {
                res.status(500).json({
                    msg:'用户名或者密码错误'
                })
                return
            }
            res.json({
                status:200,
                msg:'验证成功',
                data
            })
        }
        dbConfig.sqlConnect(sql,sqlArr,callBack)
}
module.exports = {
    getAllUser,
    getSingUser,
    deleteSingUser,
    addSingMusicUser,
    editSingUser,
    loginVerifyMusicUser
}