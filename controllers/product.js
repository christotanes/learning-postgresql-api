import pool from "../database.js";
import checkShopExists from "../util/functions.js";
import {
	addProductQuery,
	getAllProductsQuery,
	getProductsByShopQuery,
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
		await checkShopExists(shopId);
		
		const results = await pool.query(getProductsByShopQuery, [shopId]);
		res.status(200).send(results.rows);
	} catch (error) {
		if (error.message === "Shop not found") {
			res.status(404).send("Shop not found.");
		} else {
			res.status(500).send("Internal Server Error");
		}
	};
};

const addProduct = async (req, res) => {
	const { name, description, price, shop_id, category } = req.body;
	const priceNum = parseFloat(price);
	const shop_idNum = parseInt(shop_id);
	validateNumInput(priceNum);
	validateNumInput(shop_idNum);

	try {
		await checkShopExists(shop_idNum);
		const results = await pool.query(addProductQuery, [name, description, priceNum, shop_idNum, category]);
		if (results) {
			res.status(201).send(results.rows);
		}

	} catch (error) {
		if (error.message === "Shop not found") {
			res.status(404).send("Shop not found.");
		} else {
			res.status(500).send("Internal Server Error");
		}
	}
}

export {
	getAllProducts,
	getProductsByShop,
	addProduct,
};