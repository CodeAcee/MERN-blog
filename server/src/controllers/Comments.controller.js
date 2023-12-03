const CommentSchema = require("../models/Comments.schema");

const getCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.id;

    const comments = await CommentSchema.find({ post: postId }).populate(
      "user"
    );

    if (!comments) {
      res.send([]);
    }
    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't get a comments",
    });
  }
};

const getLatestComments = async (req, res) => {
  try {
    const comments = await CommentSchema.find().limit(3).populate("user");

    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't get latest comments",
    });
  }
};

const addComment = async (req, res) => {
  try {
    const post = req.params.id;
    const text = req.body.text;

    const newComment = new CommentSchema({
      text,
      post,
      user: req.userId,
    });

    const comment = await newComment.save();

    const populatedComment = await CommentSchema.populate(comment, {
      path: "user",
    });

    res.status(200).json(populatedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't leave a comment",
    });
  }
};

module.exports = {
  getCommentsByPostId,
  getLatestComments,
  addComment,
};
