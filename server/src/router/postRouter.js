const express = require("express");
const {
  getAllPosts,
  getPostById,
  deletePost,
  createPost,
  updatePost,
  getPostsByTag,
  getAllPopulatePosts,
  addComment,
} = require("../controllers/Post.controller");
const { postCreateValidation } = require("../validations/auth");
const checkAuth = require("../utils/checkAuth");
const errorHandlers = require("../utils/errorHandlers");

const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.get("/populate", getAllPopulatePosts);
postRouter.get("/:id", getPostById);
postRouter.delete("/:id", checkAuth, deletePost);
postRouter.post("/", checkAuth, postCreateValidation, createPost);
postRouter.patch("/:id", checkAuth, errorHandlers, updatePost);
postRouter.get("/tags/:tag", getPostsByTag);

module.exports = postRouter;
