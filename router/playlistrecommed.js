// // 创建推荐列表路由表  调用封装的对Recommend操作的方法
const playlistRecommendRouter = require('express').Router()
var playlistRecommend = require('../controller/playlistrecommended')
playlistRecommendRouter
.get('/getAllplaylistcommend',playlistRecommend.getAllplaylistcommend)
.get('/queryAllplaylistcommend',playlistRecommend.queryAllplaylistcommend)
.get('/getSingplaylistcommend',playlistRecommend.getSingplaylistcommend)
.delete('/deleteSingplaylistcommend',playlistRecommend.deleteSingplaylistcommend)
.post('/addSingplaylistcommend',playlistRecommend.addSingplaylistcommend)
.post('/editSingplaylistcommend',playlistRecommend.editSingplaylistcommend)
module.exports = playlistRecommendRouter