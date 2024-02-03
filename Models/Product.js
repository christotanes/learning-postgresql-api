import pool from "../database.js";
import checkShopExists from "../util/functions.js";
import { 
    addProductQuery,
    editProductQuery,
    getAllProductsQuery, 
    getProductsByShopQuery,
 } from "../util/query";
import validateNumInput from "../util/validateInput.js";

class Product {
    static async getAll(){
        try {
            const results = await pool.query(getAllProductsQuery);
            return results.rows;
        } catch (error) {
            throw error;
        };
    };
    
    static async getProductsByShop(shop_id){
        try {
            await validateNumInput(parseInt(shop_id));
            await checkShopExists(shop_id);
            const results = await pool.query(getProductsByShopQuery, [shop_id]);
            return results.rows;
        } catch (error) {
            throw error;
        };
    };

    static async create({ name, description, price, shop_id, category }){
        try {
            await validateNumInput(parseInt(shop_id));
            await validateNumInput(parseFloat(price));

            await checkShopExists(shop_id);
            const result = await pool.query(addProductQuery, [name, description, price, shop_id, category]);
            if (result.rowCount === 1 ) {
                return result.rows[0];
            } else {
                throw new Error("Create Unsuccessful");
            }
        } catch (error) {
            throw error;
        }
    };

    static async edit(id, updates){
        try {
            await validateNumInput(parseInt(id));
            const dynamicQuery = await editProductQuery(updates, id);
            const result = await pool.query(dynamicQuery.query, dynamicQuery.values);
            if (result.rowCount === 1) {
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