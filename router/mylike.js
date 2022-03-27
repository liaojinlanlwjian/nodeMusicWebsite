// 创建用户路由表  调用封装的对user操作的方法
const router = require('express').Router()
var mylike = require('../controller/myLikeController')
router
.get('/querylike',mylike.getAllLike)
.delete('/deleteLike',mylike.deleteMyLike)
.post('/addLike',mylike.addMylike)
module.exports = router
 