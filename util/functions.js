import Query from "./query.js";
import pool from "../database.js";

async function checkShopExists (shopId) {
	const shopExistsResult = await pool.query(Query.checkShopExistsQuery, [shopId]);
		if (shopExistsResult.rowCount === 0) {
			throw new Error("Shop not found")
		}
};

export default checkShopExists;