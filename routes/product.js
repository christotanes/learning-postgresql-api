import { Router } from "express";
import {
	addProduct,
	editProduct,
	getAllProducts,
	getProductsByShop,
} from "../controllers/product.js";
import {
	verifyAccess,
	verifyAdmin
} from "../auth.js";

const router = Router();

router.route("/").get(getAllProducts)
	.post(verifyAccess, verifyAdmin, addProduct);
router.route("/:id").put(verifyAccess, verifyAdmin, editProduct);
router.get("/:shopId/all", getProductsByShop);

export default router;