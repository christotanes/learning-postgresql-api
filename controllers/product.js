import pool from "../database.js";
import {
	checkShopExistsQuery,
	getAllProductsQuery, getProductsByShopQuery,
} from "../util/query.js";
import validateNumInput from "../util/validateInput.js";

const getAllProducts = async (req, res) => {
	try {
		const results = await pool.query(getAllProductsQuery);
		res.status(200).send(results.rows);
	} catch (error) {
		res.status(500).send("Internal Server Error");
	}
};

const getProductsByShop = async (req, res) => {
	const shopId = parseInt(req.params.shopId);
	validateNumInput(shopId);

	try {
		const shopExistsResult = await pool.query(checkShopExistsQuery, [shopId]);
			if (shopExistsResult.rowCount === 0) {
				return res.status(404).send("Shop not found.");
		} 
		
		const results = await pool.query(getProductsByShopQuery, [shopId]);
		res.status(200).send(results.rows);
	} catch (error) {
		res.status(500).send("Internal Server Error");
	};
};

export {
	getAllProducts,
	getProductsByShop,
};