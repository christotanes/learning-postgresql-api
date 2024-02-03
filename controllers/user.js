import { createAccessToken } from "../auth.js";
import User from "../Models/User.js";

export async function getUsers (req, res) {
	try {
		const users = await User.getAll();
		res.status(200).json(users.rows);
	} catch (error) {
		res.status(500).send(error);
	}
};

export async function getUserById (req, res) {
	try {
		const user = await User.getById(req.params.id);
		res.status(200).json(user.rows);
	} catch (error) {
		res.status(500).send(error);
	}
};

export async function registerUser (req, res) {
	try {
		const newUser = await User.create(req.body);
		if (newUser) {
			res.status(201).json(newUser.rows);
		}
	} catch (error) {
		if (error.code === '23505'){
			res.status(409).send("Username or Email already exists");
		} else {
			res.status(500).send("Internal Server Error");
		}
	}
};

export async function loginUser (req, res) {
	try {
		const userFound = await User.login(req.body);
		switch (userFound) {
			case "User not found":
				res.status(404).send(`User not found`);
				break;
			case "Unauthorized Access":
				res.status(401).json({ error: "Unauthorized access" });
				break;
			default:
				res.status(201).send({ access: createAccessToken(userFound.rows[0]) });
				break;
		}
	} catch (error) {
		res.status(500).send("Internal Server Error");
	}
};

export async function changePassword (req, res) {
	try{
		const updateResult = await User.changePW(req.params.id, req.body.password, req.user);
		switch (updateResult) {
			case "Same password":
				res.status(401).send("Can't use same password");
				break;
			case "Incorrect Id":
				res.status(409).send("Unauthorized Access. Incorrect id")
				break;
			default:
				res.sendStatus(200);
				break;
		}
	} catch (error){
		res.status(500).send("Internal Server Error");
	}
};

export async function changeUserToAdmin (req, res){
	try{
		await User.toAdmin(req.params.id);
		res.send(204);
	} catch (error){
		res.status(500).send("Internal Server Error");
	}
};