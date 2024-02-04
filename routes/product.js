import { Router } from "express";
import {
	activateProduct,
	addProduct,
	archiveProduct,
	editProduct,
	getActiveProducts,
	getAllProducts,
	getProductsByShop,
} from "../controllers/product.js";
import {
	verifyAccess,
	verifyAdmin
} from "../auth.js";

const router = Router();

router.route("/").get(getActiveProducts)
	.post(verifyAccess, verifyAdmin, addProduct);

router.get("/all", verifyAccess, verifyAdmin, getAllProducts);
router.route("/:id").put(verifyAccess, verifyAdmin, editProduct);

router.patch("/:id/archive", verifyAccess, verifyAdmin, archiveProduct);
router.patch("/:id/activate", verifyAccess, verifyAdmin, activateProduct);
router.get("/:shopId/all", getProductsByShop);

export default router;