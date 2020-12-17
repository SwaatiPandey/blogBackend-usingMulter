const fs = require("fs");
const path = require("path");
// const mongoose = require("mongoose");
// const Blog = require("../models/taskSchema.js");
const Blogs = require("../models/blogs.js");
const AppError = require("../helpers/appErrorClass");
const sendErrorMessage = require("../helpers/sendError");
const sendResponse = require("../helpers/sendResponse");
const fileName = path.join(__dirname, "..", "data", "blogs.json");
const blogs = JSON.parse(fs.readFileSync(fileName, "utf-8"));

//get all blogs
const getAllBlogs = (req, res, next) => {
  let result = blogs.filter((blog) => {
    return Object.keys(req.query).every((param) => {
      return blog[param] == req.query[param];
    });
  });
  sendResponse(200, "Successful", result, req, res);
};
//get one by id
const getBlogById = (req, res) => {
  const blogDisplay = blogs.find((blog) => {
    return blog.id == req.params.id;
  });
  if (blogDisplay) {
    sendResponse(200, "Successful", [blogDisplay], req, res);
  } else {
    sendErrorMessage(
      new AppError(404, "Not Found", "task not available"),
      req,
      res
    );
  }
};

//delete by id
const deleteBlogById = (req, res) => {
  const result = blogs.indexOf(blogs.id == req.param.id);
  blogs.splice(index, 1);
  if (index) {
    sendResponse(200, "Successfull", [result], req, res);
  } else {
    sendErrorMessage(new AppError(404, "Not Found", "No such blog"), req, res);
  }
};

module.exports.getAllBlogs = getAllBlogs;
module.exports.getBlogById = getBlogById;
module.exports.deleteBlogById = deleteBlogById;
