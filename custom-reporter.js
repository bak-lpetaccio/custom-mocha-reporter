var mocha = require('mocha');
var request = require('./request');
var npmPackage = require('./package.json');


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
        var obj = {
          'package_version' : npmPackage.version,
          'package_name' : npmPackage.name,
          tests,
          failures,
          passes
        };
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
