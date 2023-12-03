const express = require("express");
const upload = require("../utils/fileUpload");
const uploadFile = require("../controllers/File.controller");

const fileRouter = express.Router();

fileRouter.post("/file", upload.single("image"), uploadFile);

module.exports = fileRouter;
