require("dotenv").config();
const http = require("http");
const app = require("./app");
const { mongoConnect } = require("./src/services/mongo");

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

// Port listening
async function startServer() {
  await mongoConnect();
  server.listen(PORT, () => {
    console.log(`App running in ${PORT} port`);
  });
}

startServer();
