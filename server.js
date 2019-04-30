// load the environment variables
require("./config/environment")();

const app = require("./app");
const http = require("http");

const PORT = process.env.PORT || 5000;

/**
 * This function takes the approach described in the node js best practices
 * abstracting app and server from each other
 * @see https://github.com/i0natan/nodebestpractices/blob/master/sections/projectstructre/separateexpress.md
 * this will simply create a server with the app.js listening on PORT
 */
const createSimpleServer = app => {
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`Hello World 🌎 I'm Listening on port ${PORT} `);
  });
};

createSimpleServer(app);
