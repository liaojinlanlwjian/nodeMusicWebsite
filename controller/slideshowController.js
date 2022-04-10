var dbConfig = require('../util/dbconfig')
//获取全部轮播图
getAllSlideshow = (req,res)=>{
    var sql = 'select * from slideshow'
    var sqlArr = []
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
// 删除单个轮播图信息
deleteSlideshow = (req,res)=>{
    let {id} = req.query
    var sql = `delete from slideshow where id=?`;
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
// 增加单个轮播图信息
addSlideshow = (req,res)=>{
    var src = req.body.src
    var alt = req.body.alt
    var user = req.body.user
    var time = req.body.time
    //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let id = Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
    var sql = "insert into slideshow (id,src,alt,created_by,created_time) values(?,?,?,?,?)";
    var sqlArr = [id,src,alt,user,time];
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
    getAllSlideshow,
    deleteSlideshow,
    addSlideshow,
}