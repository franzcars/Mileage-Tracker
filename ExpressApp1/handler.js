'use strict';
var fs = require('fs');

var AWS = require('aws-sdk'),
    documentClient = new AWS.DynamoDB.DocumentClient();

AWS.config.update({
    region: "us-east-2",
});
exports.database = function (event, context,callback){
    'use strict';
        var params = {
            TableName: 'Mileage'
        };
        documentClient.scan(params, function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
                console.log(data);
            }
        }
        );

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};