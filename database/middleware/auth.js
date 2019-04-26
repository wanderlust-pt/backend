// middleware to check for authentication <-- not setup yet
const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_SECRET || 'Keep it secret, keep it safe!'; // can be anything you want

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

function genToken(user) {
	const payload = {
	  username: user.username,
	  userId: user.id,
	  roles: ["admin", "user"]
	};
	const secret = process.env.JWT_SECRET;
  
	const options = {
	  expiresIn: "45m"
	};
	return jwt.sign(payload, secret, options);
  }
module.exports = {
	auth,
	genToken
};
