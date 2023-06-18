const { Router } = require("express");
const router = Router();
const engine = require("express-edge");

/** set edge engine */
router.use(engine);

router.get("/", (req, res) => {
  res.render("home", { title: "Home Page", h1: "Hello Edge template" });
});

module.exports = { router };
