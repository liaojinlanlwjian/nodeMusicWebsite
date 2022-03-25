const mysql = require('mysql')
//导出数据库配置
module.exports = {
    config:{
        host:'localhost',
        port:'3306',
        user:'root',
        password:'123456',
        database:'musicWebsite'
    },
    //开始链接数据库
    //连接池对象
    sqlConnect:function(sql,sqlArr,callBack){
        var pool = mysql.createPool(this.config)
        pool.getConnection((err,conn)=>{
            console.log("连接中.....");
            if (err) {
                console.log(err);
                console.log('连接失败');
                return
            }
            console.log('连接成功');
            //事件驱动
            conn.query(sql,sqlArr,callBack);
            //释放连接
            conn.release();
        })
    }
}