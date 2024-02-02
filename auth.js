import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET_KEY; 

function createAccessToken(user) {
	const data = {
		id: user.id,
		username: user.username,
		email: user.email,
		isAdmin: user.is_admin
	};
	return jwt.sign(data, secret, {});
};

export default createAccessToken;