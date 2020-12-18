const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  createNewBlog,
  deleteBlogById,
} = require("../controllers/blogController");
const upload = require("../controllers/imageRendering.js");
const router = express.Router();
router.route("/").get(getAllBlogs).post(upload.single("image"), createNewBlog);
router.route("/:id").get(getBlogById).delete(deleteBlogById);

module.exports = router;
