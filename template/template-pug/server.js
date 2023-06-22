const express = require("express");
const app = express();
require("colors");
require("dotenv").config();
const port = process.env.PORT;
const fs = require("fs");

/** set pug engine */
app.set("views", "./resources/views");
app.set("view engine", "pug");

fs.readdirSync("./routers").forEach(async (folder) => {
  fs.readdirSync(`./routers/${folder}`).forEach(async (file) => {
    const { router: route } = require(`./routers/${folder}/${file}`);
    app.use(route);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd()));

app.listen(port, () => {
  console.log(`Server running on port ${port.magenta}`);
});