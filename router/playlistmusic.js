// 创建用户路由表  调用封装的对user操作的方法
const router = require('express').Router()
var playlistmusic = require('../controller/playlistmusic')
router
.get('/queryByPageplaylistmusic',playlistmusic.getAllplaylistmusic)
.delete('/deleteplaylistmusic',playlistmusic.deleteSingplaylistmusic)
.post('/addplaylistmusic',playlistmusic.addSingplaylistmusic)
module.exports = router
 