const AWS = require('aws-sdk');
var lamVa = new AWS.Lambda({apiVersion: '2015-03-31', region: 'us-east-1'});
var lamOh = new AWS.Lambda({apiVersion: '2015-03-31', region: 'us-east-2'});

lamOh.invoke({FunctionName:'getAllEC2',Payload:'{"regions":["us-east-1"]}'},
  (err, data) => {
    err ? console.error(err, err.stack) : console.log(data);
  }
);
