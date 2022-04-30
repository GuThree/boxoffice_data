const express = require("express")
const db = require("../db/conn")
//这是一个格式化时间的包
const moment = require("moment")
const fs = require("fs")
const path = require("path")

const router = express.Router()

//读取路径中的父目录
function parent_path_count(path_str, count) {
    var path_temp = path_str
    for (var i = 0; i < count; i++) {
        path_temp = path.resolve(path_temp, '..')
    }
    return path_temp
}

function date_format(date) {
    //格式化数据库date类型数据的格式，由2012-02-03T00000..格式化为2012-02-03
    return moment(date).format('YYYY-MM-DD');
}

router.get("/", function (req, res) {
    // res.setHeader("Access-Control-Allow-Origin", "*")
    let content = fs.readFileSync(path.join(parent_path_count(__dirname, 2), "/html/interface/", "boxOffice.html"));
    res.end(content)
})

//登录页面路由
router.get("/login", function(req, res) { // res.setHeader("Access-Control-Allow-Origin", "*")
    let content = fs.readFileSync(path.join(parent_path_count(path.resolve(__dirname), 2), "/html/interface/", "login.html"));
    res.end(content)
})

router.post("/loginAccount", function(req, res){
    let {userName, pwd} = req.body
    var sql = "select Password from user_list where UserName='"+userName+"'";
    db.query(sql, function (err, data) {
        if(err!=null){
            console.log(err)
        }
        else if(data.length != 0){
            let realPwd = data[0].Password
            if(realPwd == pwd){
                res.end("1")
            } else {
                res.end("0")
            }
        }
        else{
            res.end();
        }
    })
})

//注册页面路由
router.get("/register", function(req, res) { // res.setHeader("Access-Control-Allow-Origin", "*")
    let content = fs.readFileSync(path.join(parent_path_count(path.resolve(__dirname), 2), "/html/interface/", "register.html"))
    res.end(content)
})

//用户注册路由
router.post("/registerAccount", function(req, res) {
    let {UserName, Password, Email} = req.body
    console.log(UserName, Password, Email);
    var time = new Date()
    var registrationTime = date_format(time)
    console.log(time, registrationTime);
    var sql = "insert into user_list (UserName,Password,Email,registrationTime) values ('" + UserName + "','" + Password + "','" + Email + "','" + registrationTime.toString() + "')"
    db.query(sql, function (err, data) {
        if(err!=null)   console.log(err)
    })
    res.end()
})

//票房榜页面路由
router.get("/ranking", function(req, res) { // res.setHeader("Access-Control-Allow-Origin", "*")
    let content = fs.readFileSync(path.join(parent_path_count(path.resolve(__dirname), 2), "/html/interface/", "ranking.html"))
    res.end(content)
})

//票房榜页面路由
router.get("/individual", function(req, res) { // res.setHeader("Access-Control-Allow-Origin", "*")
    let content = fs.readFileSync(path.join(parent_path_count(path.resolve(__dirname), 2), "/html/interface/", "individual.html"))
    res.end(content)
})

//购票指数页面路由
router.get("/marketing", function(req, res) {
    let content = fs.readFileSync(path.join(parent_path_count(path.resolve(__dirname), 2), "/html/interface/", "marketing.html"))
    res.end(content)
})

//票房大盘页面路由
router.get("/boxOffice", function(req, res) {
    let content = fs.readFileSync(path.join(parent_path_count(path.resolve(__dirname), 2), "/html/interface/", "boxOffice.html"))
    res.end(content)
})

//影片排片页面路由
router.get("/movieSchedule", function(req, res) {
    let content = fs.readFileSync(path.join(parent_path_count(path.resolve(__dirname), 2), "/html/interface/" ,"movieSchedule.html"))
    res.end(content)
})

//购票续费页面路由
router.get("/buy", function(req, res) {
    let content = fs.readFileSync(path.join(parent_path_count(path.resolve(__dirname), 2), "/html/interface/", "buy.html"))
    res.end(content)
})

//个人中心页面路由
router.get("/user", function(req, res) {
    let content = fs.readFileSync(path.join(parent_path_count(path.resolve(__dirname), 2), "user.html"))
    res.end(content)
})

//反馈页面路由
router.get("/feedBack", function(req, res) {
    let content = fs.readFileSync(path.join(parent_path_count(path.resolve(__dirname), 2), "feedBack.html"))
    res.end(content)
})

//请求购票指数页面所需数据
router.get("/mar_rank_movlist", (req, res) => {
    var sql = "select * from mar_rank_movlist";
    db.query(sql, function (err, result) {

        result.forEach(element => {
            if (element['ReleaseTime'] != null) {
                //格式化数据库date类型数据
                element['ReleaseTime'] = date_format(element['ReleaseTime'])
            }
        });

        res.send(result)

    })
})

//请求票房榜页面所需数据
router.get("/rankingData", (req, res) => {
    var sql = "select * from ranking";
    db.query(sql, function (err, result) {

        result.forEach(element => {
            if (element['ReleaseTime'] != null) {
                //格式化数据库date类型数据
                element['ReleaseTime'] = date_format(element['ReleaseTime'])
            }
            if(element['BoxOffice'] != null){
                element['BoxOffice'] = element['BoxOffice'] / 10000
                element['BoxOffice'] = element['BoxOffice'].toFixed(2)
            }
        });

        res.send(result)

    })
})

//请求影片排片页面所需数据
router.get("/RowPie_MovByShoCo_Lis", (req, res) => {
    var sql = "select * from RowPie_MovByShoCo_Lis";
    db.query(sql, function (err, result) {

        res.send(result)

    })
})



//获取票房大盘页面所需数据
router.get("/trebywholegrail_day_chart1", (req, res) => {
    var sql = "select * from trebywholegrail_day_chart1";
    db.query(sql, function (err, result) {

        result.forEach(element => {
            if (element['InsertDate'] != null) {
                //格式化数据库date类型数据
                element['InsertDate'] = date_format(element['InsertDate'])
            }
        });

        res.send(result)

    })
})
router.get("/trebywholegrail_day_chart2", (req, res) => {
    var sql = "select * from trebywholegrail_day_chart2";
    db.query(sql, function (err, result) {

        res.send(result)

    })
})
router.get("/trebywholegrail_day_chart3", (req, res) => {
    var sql = "select * from trebywholegrail_day_chart3";
    db.query(sql, function (err, result) {

        res.send(result)

    })
})
router.get("/trebywholegrail_day_chart4", (req, res) => {
    var sql = "select * from trebywholegrail_day_chart4";
    db.query(sql, function (err, result) {

        res.send(result)

    })
})
router.get("/trendbywholegrail_day_list", (req, res) => {
    var sql = "select * from trendbywholegrail_day_list";
    db.query(sql, function (err, result) {

        result.forEach(element => {
            if (element['InsertDate'] != null) {
                //格式化数据库date类型数据
                element['InsertDate'] = date_format(element['InsertDate'])
            }
            if(element['BoxOffice'] != null){
                element['BoxOffice'] = element['BoxOffice'] / 10000
                element['BoxOffice'] = element['BoxOffice'].toFixed(2);
            }
            if(element['ServicePrice'] != null){
                element['ServicePrice'] = element['ServicePrice'] / 10000
                element['ServicePrice'] = element['ServicePrice'].toFixed(2);
            }
            if(element['AudienceCount'] != null){
                element['AudienceCount'] = element['AudienceCount'] / 10000
                element['AudienceCount'] = element['AudienceCount'].toFixed(2);
            }
        });

        res.send(result)

    })
})

//请求用户信息
router.post("/getUserInformation", (req, res) => {
    var {userName}=req.body
    var sql = "select * from user_list where UserName='"+userName+"'"
    db.query(sql, function (err, result) {
        var buf = Buffer.from(JSON.stringify(result));
        res.end(buf)
    })
})


module.exports = router


