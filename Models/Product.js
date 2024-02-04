import pool from "../database.js";
import checkShopExists from "../util/functions.js";
import Query from "../util/query.js";
import Validate from "../util/validateInput.js";

class Product {
    static async getAll(){
        try {
            const results = await pool.query(Query.getAllProductsQuery);
            return results.rows;
        } catch (error) {
            throw error;
        };
    };

    static async getActive(){
        try {
            const results = await pool.query(Query.getActiveProductsQuery);
            return results.rows;
        } catch (error) {
            throw error;
        }
    }
    
    static async getByShop(shop_id){
        try {
            await Validate.isInputValid(parseInt(shop_id));
            await checkShopExists(shop_id);
            const results = await pool.query(Query.getProductsByShopQuery, [shop_id]);
            return results.rows;
        } catch (error) {
            throw error;
        };
    };

    static async create(productDetails){
        try {
            await Validate.isInputValid(productDetails);
            const { name, description, price, shop_id, category } = productDetails;
            await checkShopExists(shop_id);
            const result = await pool.query(Query.addProductQuery, [name, description, price, shop_id, category]);
            if (result.rowCount === 1 ) {
                return result.rows[0];
            } else {
                throw new Error("Create Unsuccessful");
            }
        } catch (error) {
            throw error;
        };
    };

    static async edit(id, updates){
        try {
            await Validate.isInputValid(parseInt(id));
            await Validate.isInputValid(updates);
            const dynamicQuery = await Query.editProductQuery(updates, id);
            const result = await pool.query(dynamicQuery.query, dynamicQuery.values);
            if (result.rowCount === 1) {
                return result.rows[0];
            } else {
                throw new Error("Update Unsuccessful");
            }
        } catch (error) {
            throw error;
        };
    };

    static async archive(id){
        try {
            await Validate.isInputValid(parseInt(id));

            const result = await pool.query(Query.archiveProductQuery, [id]);
            if (result.rowCount === 1) {
                return result.rows[0];
            } else {
                throw new Error("Update Unsuccessful");
            }
        } catch (error) {
            throw error;
        };
    };

    static async activate(id){
        try {
            await Validate.isInputValid(parseInt(id));

            const result = await pool.query(Query.activateProductQuery, [id]);
            if (result.rowCount === 1){
                return result.rows[0];
            } else {
                throw new Error("Update Unsuccessful");
            }
        } catch (error) {
            throw error;
        }
    }
};

export default Product;