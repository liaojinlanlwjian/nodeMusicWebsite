// 创建用户路由表  调用封装的对user操作的方法
const router = require('express').Router()
var user = require('../controller/userController')
router
.get('/queryAllUser',user.getAllUser)
.get('/querySingleUser',user.getSingUser)
.delete('/deleteSingUser',user.deleteSingUser)
.post('/addSingUser',user.addSingUser)
.post('/editSingUser',user.editSingUser)
.get('/loginVerifyUser',user.loginVerifyUser)
module.exports = router
