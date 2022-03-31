var dbConfig = require('../util/dbconfig')
//封装对推荐表的操作
//获取全部用户
getAllRecommend = (req,res)=>{
    let {start} = req.query
    var sqlByPage = 'select * from recommend limit ?,5'
    var sqlArrByPage = [parseInt(start)]
    var callBackByPagr = (err,data)=>{
    if (err) {
        console.log('出错了');
        return
    }
    var sql = 'select count(*) as total from recommend';
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
getSingRecommend = (req,res)=>{
    let {id} = req.query
    var sql = `select * from recommend where id=?`;
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
deleteSingRecommend = (req,res)=>{
    let {id} = req.query
    console.log(id);
    var sql = `delete from recommend where id=?`;
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
// 批量插入推荐表数据
batchInsertRecommend = (req,res)=>{
    let data = req.body
    for (let i = 0; i <= data.length; i++) {
        if (i < data.length) {
        var name = data[i].musicName
        var singer = data[i].musicSinger
        var cover = data[i].musicCover
        var api = data[i].musicApi
        var traffic = data[i].musicTraffic
        var down = data[i].musicDownloads
        var author = data[i].musicAuthor
        var describe = data[i].des
        var msg = data[i].musicMsg
        var type = data[i].musicType
        var status = data[i].musicStatus
        //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
        let id = data[i].id
        var sql = "insert into recommend (id,musicName,musicSinger,musicCover,musicApi,musicTraffic,musicDownloads,musicAuthor,des,musicMsg,musicType,musicStatus) values(?,?,?,?,?,?,?,?,?,?,?,?)";
        var sqlArr = [id,name,singer,cover,api,traffic,down,author,describe,msg,type,status];
        var callBack = (err,data)=>{
            if (err) {
                console.log(err);
                console.log('出错了');
                return
            }
        }
        dbConfig.sqlConnect(sql,sqlArr,callBack)
        }else{
            res.send({
                msg:'success'
            })
            return
        }
    }
}
//修改单个用户信息
editSingRecommend = (req,res)=>{
    var id = req.body.id
    var name = req.body.RecommendName
    var singer = req.body.RecommendSinger
    var cover = req.body.RecommendCover
    var api = req.body.RecommendApi
    var traffic = req.body.RecommendTraffic
    var down = req.body.RecommendDownloads
    var author = req.body.RecommendAuthor
    var describe = req.body.des
    var msg = req.body.RecommendMsg
    var type = req.body.RecommendType
    var status = req.body.RecommendStatus
    var sql = `update recommend set RecommendName=?,RecommendSinger=?,RecommendCover=?,RecommendApi=?,RecommendTraffic=?,RecommendDownloads=?,RecommendAuthor=?,des=?,RecommendMsg=?,RecommendType=?,RecommendStatus=? where id=?`;
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
    getAllRecommend,
    getSingRecommend,
    deleteSingRecommend,
    batchInsertRecommend,
    editSingRecommend
}