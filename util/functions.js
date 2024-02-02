import { checkShopExistsQuery } from "./query.js";
import pool from "../database.js";

const checkShopExists = async (shopId) => {
	const shopExistsResult = await pool.query(checkShopExistsQuery, [shopId]);
		if (shopExistsResult.rowCount === 0) {
			throw new Error("Shop not found")
		}
} 

export default checkShopExists;