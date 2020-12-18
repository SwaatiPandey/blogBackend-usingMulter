const fs = require("fs");
const path = require("path");
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
//get one blog by id
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
//Create New Blog
const createNewBlog = (req, res) => {
  console.log(req.file);
  console.log(path.join(__dirname));
  let newBlog = new Blogs(
    req.body.author,
    req.body.title,
    req.body.content,
    req.body.links,
    req.body.imageUrl
  );
  blogs.push(newBlog);
  fs.writeFile(fileName, JSON.stringify(blogs, null, 2), (err) => {
    if (err) {
      sendErrorMessage(
        new AppError(500, "Internal Error", "Error in Completing Request"),
        req,
        res
      );
      return err;
    }
    sendResponse(201, "Successful", newBlog, req, res);
  });
};

//delete blog by id
const deleteBlogById = (req, res) => {
  const result = blogs.indexOf(blogs.id == req.param.id);

  if (result) {
    blogs.splice(result, 1);
    fs.writeFile(fileName, JSON.stringify(blogs, null, 2), (err) => {
      sendResponse(200, "Successfull", [result], req, res);
    });
  } else {
    sendErrorMessage(new AppError(404, "Not Found", "No such blog"), req, res);
  }
};

module.exports.getAllBlogs = getAllBlogs;
module.exports.getBlogById = getBlogById;
module.exports.createNewBlog = createNewBlog;
module.exports.deleteBlogById = deleteBlogById;
