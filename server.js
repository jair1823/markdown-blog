const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/article");
const app = express();
const methodOverride = require('method-override')
const Article = require("./models/article");

mongoose
  .connect("mongodb://localhost/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  // .then((db) => {
  //   console.log(`Se conento`);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.set("view engine", "ejs");

app.use("/articles", articleRouter);

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    createAt: "desc",
  });
  res.render("articles/index", { articles: articles });
});

app.listen(5000, () => {
  console.log("Sever on port 5000");
});
