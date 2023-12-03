const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const api = require("./src/router/api");

const app = express();

app.use(cors());
app.use(express.static(__dirname));
app.use(express.json());
app.use(morgan("combined"));
app.use(api);

module.exports = app;
