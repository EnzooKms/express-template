const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
require("colors");
require("dotenv").config();
const fs = require("fs");
const port = process.env.PORT;

fs.readdirSync("./routers").forEach(async (folder) => {
  fs.readdirSync(`./routers/${folder}`).forEach(async (file) => {
    const { router: route } = require(`./routers/${folder}/${file}`);
    app.use(route);
  });
});

/** set edge engine */
app.set("views", `./resources/views`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd()));
app.use(cors());

http.listen(port, () => {
  console.log(`Server running on port ${port.magenta}`);
});
