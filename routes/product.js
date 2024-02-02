import { Router } from "express";
import {
	addProduct,
	getAllProducts,
	getProductsByShop,
} from "../controllers/product.js";
import {
	verifyAccess,
	verifyAdmin
} from "../auth.js";

const router = Router();

router.route("/")
	.get(getAllProducts)
	.post(verifyAccess, verifyAdmin, addProduct);
router.get("/:shopId", getProductsByShop);

export default router;