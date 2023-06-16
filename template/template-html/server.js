const express = require('express')
const app = express()
const cors = require('cors')
require('colors')
require('dotenv').config()
const port = process.env.PORT
const fs = require('fs')

fs.readdirSync('./routers').forEach(async folder => {
    fs.readdirSync(`./routers/${folder}`).filter(el => el.endsWith('.js')).forEach(async file => {
        const { router: route } = require(`./routers/${folder}/${file}`)
        app.use(route)
    })
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(process.cwd()))
app.use(cors())

app.listen(port, () => {
    console.log(`Server running on port ${port.magenta}`);
})