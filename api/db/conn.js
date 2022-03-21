const mysql = require('mysql')
// 2．建立与 MySQL 数据库的连接
const db = mysql.createPool({
    host: '127.0.0.1', // 数据库所在的服务器地址
    user: 'root', //登录数据库的账号
    password: '12345666', //登录数据库的密码
    database: 'test' //指定操作数据库
})

module.exports = db


// db.query("select * from mar_rank_movlist", function (err, data) {
//     //查询失败
//     if (err) return console.log(err.message);
//     //查询成功
//     data.forEach(element => {

//         if (element['ReleaseTime'] != null) {
//             element['ReleaseTime'] = moment(element['ReleaseTime']).format('YYYY-MM-DD');
//         }
//         // console.log(element['ReleaseTime'])
//     });
// })