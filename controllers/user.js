import { createAccessToken } from "../auth.js";
import User from "../Models/User.js";
import { errorHandler } from "../util/errorHandler.js";

export async function getUsers (req, res) {
	try {
		const users = await User.getAll();
		res.status(200).json(users);
	} catch (error) {
		errorHandler(error, res);
	}
};

export async function getUserById (req, res) {
	try {
		const user = await User.getById(req.params.id);
		res.status(200).json(user);
	} catch (error) {
		errorHandler(error, res);
	}
};

export async function registerUser (req, res) {
	try {
		const newUser = await User.create(req.body);
		if (newUser) {
			res.status(201).json(newUser);
		}
	} catch (error) {
		errorHandler(error, res);
	}
};

export async function loginUser (req, res) {
	try {
		const userFound = await User.login(req.body);
		res.status(201).send({ access: createAccessToken(userFound) });
	} catch (error) {
		errorHandler(error, res);
	}
};

export async function changePassword (req, res) {
	try{
		const updateResult = await User.changePW(req.params.id, req.body.password, req.user);
		res.sendStatus(200);
	} catch (error){
		errorHandler(error, res);
	}
};

export async function changeUserToAdmin (req, res){
	try{
		await User.toAdmin(req.params.id);
		res.send(204);
	} catch (error){
		errorHandler(error, res);
	}
};