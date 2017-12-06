const AWS = require('aws-sdk');

var arglength = process.argv.length;
var numRequests = 0;

if(arglength > 2) {
  if(process.argv[2] === '-n') {
    if(arglength >= 4) {
      numRequests = +process.argv[3];
      console.log(numRequests);
    } else {
      console.error("Please supply an integer number of requests to process.");
    }
  }
} else {
  numRequests = 1;
}

if(numRequests > 0) {
  var lamOh = [], lamVa = [];
  console.log("=========== - Creating Requests - ===========");
  for(let i = 0; i < numRequests; i++) {
    // lamVa.push(new AWS.Lambda({apiVersion: '2015-03-31', region: 'us-east-1'})
    //   .invoke({FunctionName:'<FIND NAME>',Payload:'{"regions":["us-east-1"]}'})
    //   .promise());
    lamOh.push(new AWS.Lambda({apiVersion: '2015-03-31', region: 'us-east-2'})
      .invoke({FunctionName:'getAllEC2',Payload:'{"regions":["us-east-1"]}'})
      .promise());
  }

  for(let promise of lamOh) {
    promise.then(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.error(err, err.stack);
      }
    );
  }

}
