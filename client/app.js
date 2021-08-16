var express = require("express");
require('dotenv').config({ path: __dirname + '/.env' });
var path = require("path");
var routes = require("./routes/index.js"); // server side
var account = require("./routes/account.js");
var purchase = require("./routes/purchase.js");
var bodyParser = require("body-parser");

var port = process.env.PORT || 3000;

var app = express();
var router = express.Router();
app.set("view engine", "ejs"); // set view engine
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// ==========================

routes(router);
app.use("/", router);
app.use("/account", account);
app.use("/purchase", purchase);

// ==========================



app.get("*", function (req, res) {
  res.render("pages/error");
});

app.listen(port);
console.log(`server is listening on port ${port}`);
