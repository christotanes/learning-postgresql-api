import { Router } from "express";
import { getAllShops } from "../controllers/shop";

const router = Router();

router.get("/", getAllShops);

export default router;