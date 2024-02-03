import { Router } from "express";
import {
	getUsers,
	getUserById,
	registerUser,
	loginUser,
	changePassword,
} from "../controllers/user.js";
import { verifyAccess } from "../auth.js";

const router = Router();

router.get('/', getUsers);
router.route('/:id').get(getUserById).put(verifyAccess, changePassword);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;