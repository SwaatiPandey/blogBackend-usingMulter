const express = require("express");
const { getAllBlogs, getBlogById } = require("../controllers/blogController");
const router = express.Router();
router.route("/").get(getAllBlogs);
router.route("/:id").get(getBlogById);

module.exports = router;
