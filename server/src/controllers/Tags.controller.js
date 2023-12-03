const PostSchema = require("../models/Post.schema.js");

const getAllTags = async (req, res) => {
  try {
    const posts = await PostSchema.find().limit(5);

    const tags = posts
      .map((item) => item.tags)
      .flat()
      .slice(0, 4);

    const tagsArr = Array.from(new Set(tags));

    if (!tags) {
      return res.status(404).json({
        message: "Post does not exist",
      });
    }

    res.json(tagsArr);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't get a tags",
    });
  }
};

module.exports = {
  getAllTags,
};
