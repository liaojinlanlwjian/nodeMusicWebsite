const { get } = require('express/lib/response')
var dbConfig = require('../util/dbconfig')
//封装对use表的操作
//获取全部用户
getAllUser = (req,res)=>{
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
// 获取单个用户信息
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
// 删除单个用户信息
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
// 增加单个用户信息
addSingUser = (req,res)=>{
    var userName = req.body.name
    var userTel = req.body.tel
    var userSex = req.body.sex
    var userAdress = req.body.adress
    var userRole = req.body.role
    var userWork = req.body.work
    var userPsd = req.body.psd
    var userDescribe = req.body.des
    var userAccount = req.body.acc
    //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let id = Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
    var sql = "insert into users (id,name,tel,sex,adress,role,work,psd,des,acc) values(?,?,?,?,?,?,?,?,?,?)";
    var sqlArr = [id,userName,userTel,userSex,userAdress,userRole,userWork,userPsd,userDescribe,userAccount];
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
//登录验证用户信息
loginVerifyUser = (req,res)=>{
    let {acc,psd} = req.query
    console.log(acc);
    console.log(psd);
    var sql = 'select * from users where acc=? and psd=?';
        var sqlArr = [acc,psd]
        var callBack = (err,data)=>{
        console.log(sql);

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
                msg:'验证成功'
            })
        }
        dbConfig.sqlConnect(sql,sqlArr,callBack)
}
module.exports = {
    getAllUser,
    getSingUser,
    deleteSingUser,
    addSingUser,
    editSingUser,
    loginVerifyUser
}