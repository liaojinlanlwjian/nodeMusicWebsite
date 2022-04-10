// 创建轮播图路由表  
const router = require('express').Router()
var slideshow = require('../controller/slideshowController')
router
.get('/getslideshow',slideshow.getAllSlideshow)
.delete('/deleteslideshow',slideshow.deleteSlideshow)
.post('/addslideshow',slideshow.addSlideshow)
module.exports = router