const express = require("express");
const { getAllTags } = require("../controllers/Tags.controller");
const tagsRouter = express.Router();

tagsRouter.get("/", getAllTags);

module.exports = tagsRouter;
