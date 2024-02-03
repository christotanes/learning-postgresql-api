import { checkShopExistsQuery } from "./query.js";
import pool from "../database.js";

export async function checkShopExists (shopId) {
	const shopExistsResult = await pool.query(checkShopExistsQuery, [shopId]);
		if (shopExistsResult.rowCount === 0) {
			throw new Error("Shop not found")
		}
};