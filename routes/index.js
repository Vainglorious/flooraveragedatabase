var express = require("express");
const db = require("../db/models");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/data", async function (req, res, next) {
  const data = await db.Token.findAll();
  res.json(data);
});

module.exports = router;
