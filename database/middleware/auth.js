// middleware to check for authentication <-- not setup yet
const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET || 'This can be anything, will ask team';

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
		});
	} else {
		return res.status(401).json({
			error: 'User not logged in'
		});
	}
}

// middleware to generate a secure token

function genToken(user) {}
module.exports = {
	auth,
	genToken
};
