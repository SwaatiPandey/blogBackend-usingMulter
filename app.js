const express = require("express");
const dotenv = require("dotenv");
// const multer = require("multer");
dotenv.config({ path: "./config.env" });
const router = require("./routes/blogRoutes");
const { config } = require("process");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/blogs", router);
app.listen(process.env.PORT, console.log(`app started on ${process.env.PORT}`));
