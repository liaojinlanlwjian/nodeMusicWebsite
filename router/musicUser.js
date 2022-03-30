// 创建用户路由表  调用封装的对user操作的方法
const router = require('express').Router()
var musicUser = require('../controller/musicUserController')
router
// .get('/queryAllUser',user.getAllUser)
// .get('/querySingleUser',user.getSingUser)
// .delete('/deleteSingUser',user.deleteSingUser)
.post('/addSingMusicUser',musicUser.addSingMusicUser)
// .post('/editSingUser',user.editSingUser)
.get('/loginVerifyMusicUser',musicUser.loginVerifyMusicUser)
module.exports = router
 