import { Router } from "express";
import {
	getUsers,
	getUserById,
	registerUser,
	loginUser,
	changePassword,
	changeUserToAdmin,
} from "../controllers/user.js";
import { verifyAccess, verifyAdmin } from "../auth.js";

const router = Router();

router.get('/', getUsers);
router.route('/:id').get(getUserById)
	.put(verifyAccess, changePassword)
	.patch(verifyAccess, verifyAdmin, changeUserToAdmin);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;