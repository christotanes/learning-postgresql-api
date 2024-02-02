import pool from "../database.js";
import bcrypt from "bcrypt";
import {
	changePasswordQuery,
	getUserByIdQuery,
	getUserPasswordQuery,
	getUsersQuery,
	loginUserQuery,
	registerUserQuery
} from "../util/query.js";
import validateNumInput from "../util/validateInput.js";
import { createAccessToken } from "../auth.js";

const getUsers = async (req, res) => {
	try {
		const results = await pool.query(getUsersQuery)
		res.status(200).json(results.rows);
	} catch (error) {
		res.status(500).send(error);
	}
};

const getUserById = async (req, res) => {
	const id = parseInt(req.params.id);
	validateNumInput(id);

	try {
		const results = await pool.query(getUserByIdQuery, [id]);
		res.status(200).json(results.rows);
	} catch (error) {
		res.status(500).send(error);
	}
};

const registerUser = async (req, res) => {
	const { username, password, email, full_name, contact_number } = req.body;
	const contact_int = parseInt(contact_number);
	validateNumInput(contact_int);

	try {
		const hashPassword = await bcrypt.hash(password, 10);
		const results = await pool.query(registerUserQuery, [username, hashPassword, email, full_name, contact_int])
		if (results) {
			res.status(201).json(results.rows);
		}
	} catch (error) {
		res.status(409).send(error);
	}
};

const loginUser = async (req, res) => {
	const { password, email } = req.body;

	try {
		const results = await pool.query(loginUserQuery, [email]);
		if (!results) {
			return res.status(404).send(`User not found`);
		} else {
			const isPasswordCorrect = bcrypt.compareSync(password, results.rows[0].password);
			if (isPasswordCorrect) {
				res.status(201).send({ access: createAccessToken(results.rows[0]) });
			} else {
				res.status(401).json({ error: "Unauthorized access" });
			}
		}
	} catch (error) {
		res.status(500).send("Internal Server Error");
	}
}

const changePassword = async(req, res) => {
	const id = parseInt(req.params.id);
	const newPassword = req.body.password;

	try{
		const result = await pool.query(getUserPasswordQuery, [id]);
		const isPasswordDifferent = bcrypt.compareSync(newPassword, result.rows[0].password);
		if(isPasswordDifferent === false){
			const hashPassword = bcrypt.hashSync(newPassword, 10);
			const updateResult = await pool.query(changePasswordQuery, [hashPassword, id]);
			res.sendStatus(200);
		} else if (isPasswordDifferent === true){
			res.status(401).send("Can't use same password");
		}
	} catch (error){
		res.status(500).send("Internal Server Error");
	}
}

export {
	getUsers,
	getUserById,
	registerUser,
	loginUser,
	changePassword,
};