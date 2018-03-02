const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET || 'JWT_~secret*\\key'

// Wild guess. Might be wrong
function sign(userId) {
  return jwt.sign({
    data:{id: userId}},
    secret,
    {expiresIn: '3h'}
    );
}

function verify(token, callback) {
  jwt.verify(token, secret, callback)
}

module.exports = { sign, verify }
