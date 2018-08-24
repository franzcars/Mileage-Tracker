'use strict';
var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-east-2",
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Tracker";
router.all('/', function (req, res) {

var vin = req.body.Vin;
    var mileage = req.body.Mileage;
var car = "Evo";
    var color = "White";
    console.log(vin);
    console.log(mileage);
var params = {
    TableName: table,
    Item:{
        "Vin": vin,
        "Mileage": mileage,
        "Color": color,
        "Car":car
    }
};

docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        var stuff = JSON.stringify(data);
        console.log(data);
        console.log(stuff.Item);
        res.render('index', { title: 'Justin', added: "Your vehicle has been added sucessfully" });

    }
    });
});
/* GET home page. */


module.exports = router;
