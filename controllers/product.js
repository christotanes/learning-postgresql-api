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

export async function getActiveProducts(req, res) {
	try {
		const products = await Product.getActive();
		res.status(200).send(products);
	} catch (error) {
		errorHandler(error, res)
	}
}

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
		res.status(201).send(newProduct);
	} catch (error) {
		errorHandler(error, res);
	};
};

export async function editProduct(req, res) {
	try {
		const updatedProduct = await Product.edit(req.params.id, req.body);
		res.status(201).send(updatedProduct);
	} catch (error){
		errorHandler(error, res);
	};
};

export async function archiveProduct(req, res) {
	try {
		await Product.archive(req.params.id);
		res.status(200)
	} catch (error) {
		errorHandler(error, res);
	};
};

export async function activateProduct(req, res) {
	try {
		await Product.activate(req.params.id);
		res.status(200);
	} catch (error) {
		errorHandler(error, res);
	}
}