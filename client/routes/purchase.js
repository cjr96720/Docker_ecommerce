var express = require("express");
var router = express.Router();

router.route("/shop").get(function (req, res) {
  res.render("pages/purchase/shop");
});

router.route("/cart").get(function (req, res) {
  res.render("pages/purchase/cart");
});

router.route("/shipment").get(function(req, res){
  res.render("pages/purchase/shipment")
})

module.exports = router;
