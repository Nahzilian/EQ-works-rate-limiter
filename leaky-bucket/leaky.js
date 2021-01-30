/**
 * Simple leaky bucket algorithm
 */
const requestIp = require('request-ip');


const numberOfRequest = 10;
const requestInterval = 3000; // In miliseconds
var requests = {}

module.exports = function (req, res, next) {
    // Declare current time and the previous variable for comparision
    console.log(requests)
    var prev, cur = Date.now();
    const ip = requestIp.getClientIp(req)
    if (requests[`user_${ip}`]) {
        // Push the newest request to the array
        requests[`user_${ip}`].push(cur);
        if (requests[`user_${ip}`].length >= numberOfRequest) {
            prev = requests[`user_${ip}`].shift();
            if (cur - prev <= requestInterval) {
                res.status(503).json({ error: `Exceeded ${numberOfRequest} per ${requestInterval / 1000} second(s)` })
                return
            }
        }
    }else{
        requests[`user_${ip}`] = [cur];
    }

    next()
}


