const experss = require('express')
const path=require('path');
const cors=require('cors');

const app = experss()
// app.use(express.static('public'))
const usersRouter = require('./router/user')
const musicListRouter = require('./router/musicList')
const recommendRouter = require('./router/recommend')
const recentPlayRouter = require('./router/recentPlay')
const musicUserRouter = require('./router/musicUser')
const myLikerRouter = require('./router/mylike')
const singListRouter = require('./router/singList')
const singListMusicRouter = require('./router/singListMusic')
var bodyParser = require('body-parser')
//配置解析表单请求体
app.use(experss.json())
// app.use(cors)
app.use(experss.static(path.join(__dirname, 'public')))
//解析表单数据请求体 直接挂载
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(experss.urlencoded())
app.use('/api/user',usersRouter)
app.use('/api/music',musicListRouter)
app.use('/api/recommend',recommendRouter)
app.use('/api/recent',recentPlayRouter)
app.use('/api/musicUser',musicUserRouter)
app.use('/api/like',myLikerRouter)
app.use('/api/singlist',singListRouter)
app.use('/api/singlistmusic',singListMusicRouter)

app.listen(3001,()=>{
    console.log("running at 3001")
})
// const { getDb,saveDb } = require('./db')
//读取文件 返回状态码和数据
//通过客户端（client）返回的id 进行查找相对应的数据
//封装读取文件的类 使用getDb()
//异步
// app.get('/user', async (req,res) => {
//     try{
//         const db = await getDb()
//         res.status(200).json(db.users)
//     }catch(err){
//         res.status(500).json({
//             error:err.message
//         })
//     }
    
// }),
// app.get('/user/:id', async (req,res) => {
//     // 封装的读取文件方法
//     try{
//         const db = await getDb()
//         const obj = db.users.find(e => e.id === Number.parseInt(req.params.id))
//         if(!obj){
//             return res.status(404).end()
//         }
//         res.status(200).json(obj)
//     }catch(err){
//         res.status(500).json({
//             error:err.message
//         })
//     }
    
// })
// //post ()
// app.post('/user', async (req,res)=>{
//     try{
//         const data = req.body
//         console.log(data);
//     if(!data.time || !data.type || !data.spend || !data.user){
//         res.status(422).json({
//             error:'缺少数据'
//         })
//     }else{
//         const db = await getDb()
//         const lastId = db.users[db.users.length - 1]
//         data.id = lastId ? lastId.id+1 : 1
//         db.users.push(data)
//         await saveDb(db)
//         res.status(200).json(db)
//     }
//     }catch(err){
//         res.status(500).json({
//             error:err.message
//         })
//     }
// })

// //修改
// app.patch('/user/:id', async (req,res) => {
//     try{
//         const data = req.body
//         const db = await getDb()
//         const obj = db.users.find(e => e.id === Number.parseInt(req.params.id))
//         if(!obj){
//             return res.status(404).json({
//                 error:'404'
//             })
//         }
//         //深拷贝
//         Object.assign(obj,data)
//         await saveDb(db)
//         res.status(200).json(db)
//     }catch(err){
//         res.status(500).json({
//             error:err.message
//         })
//     }
// })
// // 删除
// app.delete('/user/:id',async (req,res)=>{
//     try{
//         const db = await getDb()
//         const obj = db.users.find(e => e.id === Number.parseInt(req.params.id))
//         if(!obj){
//             return res.status(404).json({
//                 error:'404'
//             })
//         }
//         console.log(obj);
//         db.users.splice(obj,1)
//         await saveDb(db)
//         res.status(200).json({
//             message:'删除成功',
//             db
//     })
//     }catch(err){
//         res.status(500).json({
//             error:err.message
//         })
//     }
    
// })
