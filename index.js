const express = require("express")
const router = require("./api/router/router.js")

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use('/imgs', express.static('imgs'))
app.use('/css', express.static('css'))
app.use('/bootstrap', express.static('bootstrap'))
app.use('/html', express.static('html'))

app.use(router)


app.listen("8080", ()=>{
    console.log("服务器已启动")
})