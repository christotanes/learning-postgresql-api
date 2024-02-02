import pool from "../database.js";
import bcrypt from "bcrypt";
import {
	getUserByIdQuery,
	getUsersQuery,
	loginUserQuery,
	registerUserQuery
} from "../src/query.js";
import validateNumInput from "../src/validateInput.js";
import createAccessToken from "../auth.js";

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
	const hashPassword = bcrypt.hash(password, 10);

	try {
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
			const isPasswordCorrect = bcrypt.compare(password, results.rows[0].password);
			if (isPasswordCorrect) {
				res.status(201).send({ access: createAccessToken(results.rows[0]) });
			} else {
				res.status(401).json({ error: "Unauthorized access" });
			}
		}
	} catch (error) {
		res.send(500);
	}
}

export {
	getUsers,
	getUserById,
	registerUser,
	loginUser,
};