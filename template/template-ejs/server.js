const fs = require("fs");
const express = require("express");
const cors = require("cors");
require("colors");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

fs.readdirSync("./routers").forEach(async (folder) => {
  fs.readdirSync(`./routers/${folder}`).forEach(async (file) => {
    const { router: route } = require(`./routers/${folder}/${file}`);
    app.use(route);
  });
});

app.set("views", "./resources/views");
app.set("view engine", "ejs");
  
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd()));

app.listen(port, () => {
  console.log(`Server running on port ${port.magenta}`);
});
