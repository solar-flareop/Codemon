const express = require("express");
const app = express();
const dotenv = require("dotenv");

// file imports
const productRouter = require("./routes/productRoute");
const ErrorMiddleware = require("./middlewares/Error");

//config
dotenv.config();

//middleware
app.use(express.json());

//API routes
app.use("/api/v1", productRouter);

//Default api route
app.get("/", (req, res) => {
  res.status(200).send(`<h1>Welcome to Codemon Server 🚀</h1>`);
});

//Error middleware
app.use(ErrorMiddleware);

module.exports = app;
