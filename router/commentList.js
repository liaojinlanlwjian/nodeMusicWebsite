// 创建评论路由表  调用封装的对mvlist操作的方法
const router = require('express').Router()
var comment = require('../controller/commentController')
router
.post('/addComment',comment.addSingComment)
.get('/queryComment',comment.getAllComment)
module.exports = router
 