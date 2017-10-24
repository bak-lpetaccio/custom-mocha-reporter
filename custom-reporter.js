var mocha = require('mocha');
var request = require('./request');

module.exports = MyReporter;

const URL = "https://sumologic-url" // Replace by your sumologic url

function MyReporter(runner) {

    mocha.reporters.Base.call(this, runner);

    var passes = 0;
    var failures = 0;
    var tests = 0;

    runner.on('pass', function(test){
        passes++;
    });
    runner.on('fail', function(test, err){
        failures++;
    });
    runner.on('test end', function (test) {
        tests++;
    });
    runner.on('end', function(){
        var obj = { tests, passes, failures }
        request(
            method="POST",
            url=URL,
            body=JSON.stringify(obj, null, 2)
        )
        .then(function (status) {
            console.log("Promise Resolved", status);
        })
        .catch(function (err) {
            console.log("Promise Rejected", err);
        });
        console.log(JSON.stringify(obj, null, 2))
    });

}
