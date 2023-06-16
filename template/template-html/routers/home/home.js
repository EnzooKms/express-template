const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.sendFile(`${process.cwd()}/resources/views/home.html`)
})

module.exports = { router }