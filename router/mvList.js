// 创建mv路由表  调用封装的对mvlist操作的方法
const router = require('express').Router()
var mv = require('../controller/mvListController')
router
.get('/queryAllMv',mv.getAllMv)
.get('/queryAllMvByPage',mv.getAllMvByPage)
.get('/querySingMv',mv.getSingMv)
.delete('/deleteMv',mv.deleteSingMv)
.post('/addMv',mv.addSingMv)
.post('/editMv',mv.editSingMv)
module.exports = router
 