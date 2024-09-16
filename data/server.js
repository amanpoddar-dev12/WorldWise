/* eslint-disable no-undef */
import jsonServer from "json-server"; // Use ES Module syntax
const server = jsonServer.create();
const router = jsonServer.router("cities.json");
const middlewares = jsonServer.defaults();

// Use environment's PORT or default to 3000
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
