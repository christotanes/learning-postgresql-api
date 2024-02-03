import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET_KEY; 

function createAccessToken(user) {
	const payload = {
		id: user.id,
		username: user.username,
		email: user.email,
		isAdmin: user.is_admin
	};
	const options = {
		expiresIn: '1hr'
	}
	return jwt.sign(payload, secret, options);
};

function verifyAccess(req, res, next){
	let token = req.headers.authorization;

	if (typeof token == undefined){
		return res.status(401).send({ auth: "Authorization Failed. Invalid Token. "});
	} else {
		token = token.slice(7, token.length);
		jwt.verify(token, secret,  (err, decodedToken) => {
			if (err){
				return res.send({ auth: "Authorization Failed"}) 
			} else {
				req.user = decodedToken;
				next();
			}
		})
	}
}

function verifyAdmin(req, res, next) {
	if (!req.user.isAdmin) {
		return res.status(403).send({ auth: "Forbidden access"})
	} else {
		next();
	};
};

export { 
	createAccessToken,
	verifyAccess,
	verifyAdmin,
};