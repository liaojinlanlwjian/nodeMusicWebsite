// 创建歌单歌曲路由表  
const router = require('express').Router()
var singlistmusic = require('../controller/singListMusicController')
router
.get('/getSingListMusic',singlistmusic.getSingListMusic)
.delete('/deleteSingListMusic',singlistmusic.deleteSingListMusic)
.post('/addSingListMusic',singlistmusic.addSingListMusic)
.get('/getAllListMusic',singlistmusic.getAllListMusic)
module.exports = router