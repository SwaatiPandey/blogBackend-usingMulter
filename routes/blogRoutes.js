const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  deleteBlogById,
} = require("../controllers/blogController");
const router = express.Router();
router.route("/").get(getAllBlogs);
router.route("/:id").get(getBlogById, deleteBlogById);

module.exports = router;
