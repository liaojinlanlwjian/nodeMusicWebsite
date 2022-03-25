// // 创建推荐列表路由表  调用封装的对Recommend操作的方法
const recommendRouter = require('express').Router()
var Recommend = require('../controller/recommendController')
recommendRouter
.get('/queryAllRecommend',Recommend.getAllRecommend)
.get('/querySingleRecommend',Recommend.getSingRecommend)
.delete('/deleteSingRecommend',Recommend.deleteSingRecommend)
.post('/batchInsertRecommend',Recommend.batchInsertRecommend)
.post('/editSingRecommend',Recommend.editSingRecommend)
module.exports = recommendRouter
