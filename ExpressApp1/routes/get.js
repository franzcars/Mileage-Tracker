'use strict';
var express = require('express');
var router = express.Router();
var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-east-2",
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "Mileage";
router.all('/', function (req, res) {

var vin = req.body.Vin;
var car = "GTR";
    var color = "Silver";
    console.log(vin);
var params = {
    TableName: table,
    FilterExpression: 'Vin = :thisvin',
    ExpressionAttributeValues:{
        ":thisvin": vin
    }
};

docClient.scan(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        var stuff = JSON.stringify(data);
        console.log(data.Items);
        console.log(stuff.Item);
        res.render('get', { title: 'Justin', test: data.Items.Mileage });

    }
    });
});
/* GET home page. */


module.exports = router;
