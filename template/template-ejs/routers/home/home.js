const { Router } = require("express");
const router = Router()

router.get('/', (req, res) => {

    res.render('home', { title: 'Home Page', h1: `Hello Express!` })

})

module.exports = { router }