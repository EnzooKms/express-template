const fs = require('fs')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT


fs.readdirSync('./routers').forEach(async f => {

    fs.readdirSync(`./routers/${f}`).forEach(async file => {
        const { router: route } = require(`./routers/${f}/${file}`)
        app.use(route)
    })

})

app.set('views', './resources/views')
app.set('view engine', 'ejs')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(process.cwd()))

app.listen(port, () => {
    console.log(`Server running on port : ${port}`);
})