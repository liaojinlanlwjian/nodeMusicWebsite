// 创建用户路由表  调用封装的对user操作的方法
const router = require('express').Router()
var singer = require('../controller/singerListController')
router
.get('/queryByPageSinger',singer.queryByPageSinger)
.delete('/deleteSinger',singer.deleteSinger)
.post('/addSinger',singer.addSinger)
.post('/editSinger',singer.editSinger)
.get('/getSinger',singer.getSinger)
.get('/queryAllSinger',singer.queryAllSinger)
module.exports = router
 