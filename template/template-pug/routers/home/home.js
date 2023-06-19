const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("home", { title: "Home Page", h1: "Hello Pug!" });
});

module.exports = { router };
