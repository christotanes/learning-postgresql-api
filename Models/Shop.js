import pool from "../database.js";
import Query from "../util/Query.js";

class Shop {
    static async getAll() {
        console.log(`Shops getAll accessed`)
        try {
            const results = await pool.query(Query.getAllShopsQuery);
            return results.rows;
        } catch (error) {
            throw error;
        };
    };
};

export default Shop;