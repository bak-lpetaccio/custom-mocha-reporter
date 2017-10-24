const request = require('superagent');

module.exports = SendRequest;

function SendRequest(method, url, body) {
    return new Promise(function (resolve, reject) {
        request(method, url)
        .set(headers={'Accept': 'application/json'})
        .send(body)
        .end((error, response) => {
            if (error) {
                reject(error)
            } else {
                resolve({status: response.status})                
            }
        })
    })
}