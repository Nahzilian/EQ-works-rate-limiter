/**
 * Simple leaky bucket algorithm
 */

const numberOfRequest = 2;
const requestInterval = 3000; // In miliseconds
var requests = []

module.exports = function(req, res, next){
    console.log(req.user)
    // Declare current time and the previous variable for comparision
    var prev, cur = Date.now();
    // Push the newest request to the array
    requests.push(cur);
    if (requests.length >= numberOfRequest) {
        prev = requests.shift();
        if (cur - prev <= requestInterval) {
            res.status(503).json({error:`Exceeded ${numberOfRequest} per ${requestInterval/1000} second(s)`})
            return
        }
    }
    next()
}


