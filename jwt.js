const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET || 'JWT_~secret*\\key'

// Wild guess. Might be wrong
function sign(userId) {
  jwt.sign({
    id: userId,
    exp: Math.floor(Date.now() / 1000) + (3* 60 * 60)
    });

function verify(token, callback) {
  jwt.verify(token, secret, callback)
}

module.exports = { sign, verify }
