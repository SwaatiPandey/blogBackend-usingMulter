const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  createNewBlog,
  deleteBlogById,
} = require("../controllers/blogController");
const router = express.Router();
router.route("/").get(getAllBlogs).post(createNewBlog);
router.route("/:id").get(getBlogById).delete(deleteBlogById);

module.exports = router;
