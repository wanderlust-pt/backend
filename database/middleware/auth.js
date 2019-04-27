// JSON Web Tokens, cookies
const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET || 'Keep it secret, keep it safe!';

// middleware to check for authorization
function auth(req, res, next) {
    const token = req.get('Authorization');
    if (token) {
        jwt.verify(token, jwtKey, (error, decoded) => {
            if (error) {
                return res.status(401).json(error);
            }
            req.decoded = decoded;
            next();
        })
    } else {
        return res.status(401).json({
            error: "User not logged in"
        })
    }
}

// middleware to generate a secure token
function genToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };
    const options = {
        expiresIn: '1h'
    };
    return jwt.sign(payload, jwtKey, options)
}

module.exports = {
    auth,
    genToken
};