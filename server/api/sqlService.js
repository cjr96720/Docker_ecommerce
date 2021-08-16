var express = require("express");
var apirouter = express.Router();
var connection = require("../models/connection.js");

// Sign up
apirouter.route("/signup").post(function (req, res) {
  var sql = "INSERT INTO member (mname, email, password) VALUES (?, ?, ?)";
  var data = [req.body.name, req.body.email, req.body.password];
  console.log(req);
  connection.query(sql, data, function (err, result) {
    if (err) {
      res.send({ message: "Somethin is Wrong" });
    }
    res.send(result);
  });
});

// Get email
apirouter.route("/emailCheck").post(function (req, res) {
  var sql = "SELECT email FROM member WHERE email = ?";
  var data = [req.body.email];
  connection.query(sql, data, function (err, result) {
    if (err) {
      res.send({ message: "Somethin is Wrong" });
    }
    // console.log(result[0].email);
    res.send(result);
  });
});

// Log in check
apirouter.route("/login").post(function (req, res) {
  var sql = "SELECT * FROM member WHERE email = ? AND password = ?";
  var data = [req.body.email, req.body.password];
  connection.query(sql, data, (err, result) => {
    // console.log(result[0].password);
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

// Get items for shop
apirouter.route("/shop").get(function (req, res) {
  var sql = "SELECT * FROM items";
  connection.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

// Get items for cart
apirouter.route("/cart").post(function (req, res) {
  var sql = "SELECT * FROM items WHERE itemid = ?";
  // console.log(req);
  connection.query(sql, req.body.itemid, (err, result) => {
    if (err) {
      res.send(err);
    }
    console.log(result);
    res.send(result);
  });
});

// Check out
apirouter.route("/checkout").post(function (req, res) {
  var sql = "INSERT INTO cart (memberid, totalItems, totalCost) VALUES (?, ?, ?)";
  var data = [req.body.memberid, req.body.totalItems, req.body.totalCost];
  console.log(req);
  connection.query(sql, data, function (err, result) {
    if (err) {
      res.send({ message: "Somethin is Wrong" });
    }
    res.send(result);
  });
});

// Get cart ID
apirouter.route("/cartid").get(function (req, res) {
  var sql = "SELECT cartid FROM cart ORDER BY cartid DESC LIMIT 1";
  connection.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

// Order detail
apirouter.route("/cartdetail").post(function (req, res) {
  var sql = "INSERT INTO cartdetail (cartid, memberid, itemid, qty, member_add, status) VALUES (?, ?, ?, ?, ?, ?)";
  var data = [req.body.cartid, req.body.memberid, req.body.itemid, req.body.qty, req.body.memberAdd, 'Processing'];
  console.log(req);
  connection.query(sql, data, function (err, result) {
    if (err) {
      res.send({ message: "Somethin is Wrong" });
    }
    res.send(result);
  });
});

// Check order
apirouter.route("/checkorder").post(function (req, res) {
  var sql = "SELECT  * FROM cartdetail JOIN items ON cartdetail.itemid = items.itemid WHERE memberid = ?";
  connection.query(sql, [req.body.memberid], function (err, result) {
    if (err) {
      res.send({ message: "Somethin is Wrong" });
    }
    res.send(result);
  });
});

// Update status processing -> cancel
apirouter.route('/cancel').put(function(req, res){
  console.log(req);
    var sql = 'UPDATE cartdetail SET status = "cancel" WHERE cartid = ? AND memberid = ?';
    connection.query(sql, [req.body.cartid, req.body.memberid], function(err, result){
        if(err){
            console.log('error: ' + err.message);
        }
        res.send(result);
    });
});


// // Update
// apirouter.route('/people').put(function(req, res){
//     var table = req.body;
//     var data = [];
//     data.push(table.salary);
//     data.push(table.pname);
//     var sql = 'UPDATE people SET salary = ? WHERE pname = ?';
//     connection.query(sql, data, function(err, result){
//         if(err){
//             console.log('error: ' + err.message);
//         }
//         res.send(result);
//     });
// });

// // Delete
// apirouter.route('/people').delete(function(req, res){

//     var name = req.body;
//     var data = name.pname;
//     var sql = 'DELETE FROM people WHERE pname = ?';
//     connection.query(sql, data, function(err, result){
//         if(err){
//             console.log('error: ' + err.message);
//         }
//         res.send(result);
//     });

// });

module.exports = apirouter;
