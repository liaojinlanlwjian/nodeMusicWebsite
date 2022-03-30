// 创建用户路由表  调用封装的对user操作的方法
const router = require('express').Router()
var singlist = require('../controller/singListController')
router
.get('/getAllSingList',singlist.getAllSingList)
.delete('/deleteSingList',singlist.deleteSingList)
.post('/addSingList',singlist.addSingList)
.post('/editSingList',singlist.editSingList)
module.exports = router
 