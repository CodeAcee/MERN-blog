const PostSchema = require("../models/Post.schema.js");

const getAllPosts = async (req, res) => {
  try {
    const post = await PostSchema.find().populate("user");

    if (!post) {
      return res.status(404).json({
        message: "Post does not exist",
      });
    }

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't get a post",
    });
  }
};

const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await PostSchema.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } }
    ).populate("user");

    if (!postId) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    res.status(200).json(doc);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't find a post",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostSchema.findByIdAndDelete({ _id: postId });

    if (!postId) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json({
      message: `Deleted, ${postId}`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't find a post",
    });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = new PostSchema({
      title: req.body.title,
      text: req.body.text,
      imageURL: req.body.imageURL,
      tags: req.body.tags,
      user: req.userId,
    });
    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't create a post",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await PostSchema.findOneAndUpdate(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageURL: req.body.imageURL,
        tags: req.body.tags,
        user: req.userId,
      }
    );
    res.status(200).json(doc);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't create a post",
    });
  }
};

const getAllPopulatePosts = async (req, res) => {
  try {
    const posts = await PostSchema.find()
      .where("viewsCount")
      .gt(15)
      .limit(5)
      .populate("user");

    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't find a populate posts",
    });
  }
};

const getPostsByTag = async (req, res) => {
  try {
    const tag = req.params.tag;
    const posts = await PostSchema.find({ tags: tag });

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't find a tag with post",
    });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  deletePost,
  createPost,
  updatePost,
  getAllPopulatePosts,
  getPostsByTag,
};
