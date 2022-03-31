//评论
var dbConfig = require('../util/dbconfig')
// 增加单个评论给一首歌
addSingComment = (req,res)=>{
    var user = req.body.user
    var userSrc = req.body.userSrc
    var content = req.body.content
    var createTime = req.body.createTime
    var like = req.body.likedCount
    var mvApi = req.body.mvApi
    //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let id = Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
    var sql = "insert into comment (id,user,userSrc,content,createTime,likedCount,mvApi) values(?,?,?,?,?,?,?)";
    var sqlArr = [id,user,userSrc,content,createTime,like,mvApi];
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
//获取该用户对该mv的所有评论
getAllComment = (req,res)=>{
    let {user,mvApi} = req.query
    var sqlByPage = 'select * from comment where user=? and mvApi=?'
    var sqlArrByPage = [user,mvApi]
    var callBackByPagr = (err,data)=>{
    if (err) {
        console.log('出错了');
        return
    }
    res.json({
        status:200,
        msg:'获取成功',
        data
    })
}
dbConfig.sqlConnect(sqlByPage,sqlArrByPage,callBackByPagr)
}
module.exports = {
    addSingComment,
    getAllComment
}