const express = require("express");
const {
  getCommentsByPostId,
  getLatestComments,
  addComment,
} = require("../controllers/Comments.controller");
const checkAuth = require("../utils/checkAuth");
const { commentCreateValidation } = require("../validations/auth");

const commentsRouter = express.Router();

commentsRouter.get("/post/:id", getCommentsByPostId);
commentsRouter.get("/latest", getLatestComments);
commentsRouter.post("/:id", checkAuth, commentCreateValidation, addComment);

module.exports = commentsRouter;
