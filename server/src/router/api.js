const express = require("express");

const authRouter = require("./authRouter");
const postRouter = require("./postRouter");
const fileRouter = require("./fileRouter");
const tagsRouter = require("./tagsRouter");
const commentsRouter = require("./commentsRouter");

const api = express.Router();

api.use("/auth", authRouter);
api.use("/posts", postRouter);
api.use("/upload", fileRouter);
api.use("/tags", tagsRouter);
api.use("/comment", commentsRouter);

module.exports = api;
