// 创建=最近播放路由表  调用封装的对recent操作的方法
const router = require('express').Router()
var recent = require('../controller/recentPlayController')
router
.get('/querySingRecent',recent.getSingRecentMusic)
.get('/queryAllRecent',recent.getAllRecentMusic)
.get('/queryAllUserRecent',recent.getAllRecentUserMusic)
.post('/addRecentPlay',recent.addRecentMusic)
// .delete('/deleteSingUser',user.deleteSingUser)
// .post('/addSingUser',user.addSingUser)
// .post('/editSingUser',user.editSingUser)
.get('/queryNextSing',recent.queryNextSing)
.get('/queryUpxtSing',recent.queryUpxtSing)
module.exports = router