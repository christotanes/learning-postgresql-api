import { Router } from "express";
import {
	getAllProducts,
	getProductsByShop,
} from "../controllers/product.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:shopId", getProductsByShop);

export default router;