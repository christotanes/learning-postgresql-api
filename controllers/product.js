import Product from "../Models/Product.js";
import { errorHandler } from "../util/errorHandler.js";

export async function getAllProducts (req, res){
	try {
		const products = await Product.getAll();
		res.status(200).send(products);
	} catch (error) {
		errorHandler(error, res);
	}
};

export async function getProductsByShop (req, res){
	try {
		const products = await Product.getByShop(req.params.shopId);
		res.status(200).send(products);
	} catch (error) {
		errorHandler(error, res);
	};
};

export async function addProduct (req, res){
	try {
		const newProduct = await Product.create(req.body);
		res.status(200).send(newProduct);
	} catch (error) {
		errorHandler(error, res);
	};
};

export async function editProduct(req, res) {
	try {
		const updatedProduct = await Product.edit(req.params.id, req.body);
		res.status(204);
	} catch (error){
		errorHandler(error, res);
	};
};