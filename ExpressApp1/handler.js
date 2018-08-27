'use strict';
var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-east-2",
});

    var docClient = new AWS.DynamoDB.DocumentClient();

module.exports.hello = async (event, context) => {
    var hello = "Hello Wrold";
  return {
    statusCode: 200,
    body: JSON.stringify({
        message: 'Go Serverless v1.0! Your function executed successfully!',
        value: hello,
    //  input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};


module.exports.database = async (event, context) => {
    var hello = "Database ready to go";

    var table = "Tracker";
    var params = {
        TableName: table
    };
    console.log(params);
    docClient.scan(params, function (err, data) {
        console.log("inside");
        if (err) {
            callback(err, null);
        } else {
            callback(null, data.Items);
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'database pulled'
                }),
            };
        }
    });

    

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};