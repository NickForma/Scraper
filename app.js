const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const indexRouter = require("./routes/pageRoutes");
const usersRouter = require("./routes/user");
const apiRouter = require("./routes/apiRoutes");

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";
// mongoose.connect(MONGODB_URI)

const app = express();

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on port ${process.env.PORT || 3000}`);
});

// view engine setup
app.engine("handlebars", exphbs({ defaultLayout: "main", extname: ".handlebars" }));
app.set("view engine", "handlebars");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);

module.exports = app;
