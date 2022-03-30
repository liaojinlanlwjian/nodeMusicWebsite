// 创建歌单歌曲路由表  
const router = require('express').Router()
var singlistmusic = require('../controller/singListMusicController')
router
.get('/getSingListMusic',singlistmusic.getSingListMusic)
.delete('/deleteSingListMusic',singlistmusic.deleteSingListMusic)
.post('/addSingListMusic',singlistmusic.addSingListMusic)
// .post('/editSingList',singlistmusic.editSingList)
module.exports = router