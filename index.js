const AWS = require('aws-sdk');

var arglength = process.argv.length;
var numRequests = 0;

if(arglength > 2) {
  if(process.argv[2] === '-n') {
    if(arglength >= 4) {
      numRequests = +process.argv[3];
    } else {
      console.error("Please supply an integer number of requests to process.");
    }
  }
} else {
  numRequests = 1;
}

if(numRequests > 0) {
  var lamOh = [], lamVa = [];
  console.log("=========== - Creating", numRequests, "Requests - ===========");
  for(let i = 0; i < numRequests; i++) {
    lamVa.push(new AWS.Lambda({apiVersion: '2015-03-31', region: 'us-east-1'})
      .invoke({FunctionName:'ReportTool',Payload:'["us-east-1"]'})
      .promise());
    lamOh.push(new AWS.Lambda({apiVersion: '2015-03-31', region: 'us-east-2'})
      .invoke({FunctionName:'getAllEC2',Payload:'{"regions":["us-east-1"]}'})
      .promise());
  }
  console.log("=========== - Requests Created - ===========");

  console.log("=========== - Processing Requests - ===========");
  processPromises(lamOh);
  processPromises(lamVa);

}

function processPromises(promises) {
  for(let promise of promises) {
    promise.then(
      (data) => {
        console.log(data.Payload);
      },
      (err) => {
        console.error(err, err.stack);
      }
    );
  }
}
