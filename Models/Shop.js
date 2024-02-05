import pool from "../database";
import Query from "../util/query";

class Shop {
    static async getAll(){
        try {
            const results = await pool.query(Query.getAllShopsQuery);
            return results.rows;
        } catch (error) {
            throw error;
        }
    };
};

export default Shop;