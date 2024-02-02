import { Router } from "express";
import {
	getUsers,
	getUserById,
	registerUser,
	loginUser
} from "../controllers/user.js";

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;