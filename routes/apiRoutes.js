const express = require("express");
const router = express.Router();
const Scraper = require("../utils/Scrape");
const db = require("../models");
const cheerioHelper = require("../utils/Cheerios");

router.get("/scrape", (req, resp, next) => {
  Scraper.scrape(res => {
    let data = cheerioHelper(res.data);
    db.Article.insertMany(data, { ordered: false }, (err, docs) => {
      if (err) {
        console.log(err);
      }
      resp.json(docs);
    });
  });
});

router.get("/articles", (req, resp, next) => {
  db.Article.find((err, data) => {
    resp.json(data);
  }).catch(err => {
    //return err info
    resp.json(err);
  });
});

router.post("/article/:id", (req, resp, next) => {
  let id = req.params.id;
  let data = ({ author, userComment } = req.body);
  console.log(req);
  console.log(data);

  db.Comment.create(data)
    .then(data => {
      return db.Article.findOneAndUpdate(
        { _id: id },
        { $push: { comments: data._id } },
        { new: true }
      );
    })
    .then(articleComments => {
      resp.json(articleComments);
    })
    .catch(err => {
      //return err info
      resp.json(err);
    });
});

module.exports = router;
