import pool from "../database.js";
import Query from "../util/Query.js";
import Validate from "../util/validateInput.js";
import bcrypt from 'bcrypt';

class User {
    static async getAll() {
        console.log('GetAll accessed')
        try {
            const results = await pool.query(Query.getUsersQuery);
            return results.rows;
        } catch (error) {
            throw error;
        };
    };

    static async getById(id) {
        console.log(`getById accessed id: ${id}`)
        try {
            await Validate.isInputValid(parseInt(id));
            const results = await pool.query(Query.getUserByIdQuery, [id]);
            return results.rows[0];
        } catch (error) {
            throw error;
        };
    };

    static async create(userDetails) {
        console.log(`Create user accessed`)
        try {
            await Validate.isInputValid(userDetails);
            const { username, password, email, full_name, contact_number } = userDetails;
            const hashPassword = this.#hashPassword(password);
            const results = await pool.query(Query.registerUserQuery, [username, hashPassword, email, full_name, contact_number])
            if (results.rowCount === 1) {
                return results.rows[0];
            } else {
                throw new Error("Create Unsuccessful");
            }
        } catch (error) {
            throw error;
        };
    };

    static async login(userDetails) {
        console.log('Login accessed')
        try {
            await Validate.isInputValid(userDetails);
            const { email, password } = userDetails;
            const results = await pool.query(Query.loginUserQuery, [email]);
            if (results.rowCount === 0) {
                throw new Error("User not found");
            } else {
                const isPasswordCorrect = this.#isPasswordCorrect(password, results.rows[0].password);
                if (isPasswordCorrect) {
                    return results.rows[0];
                } else {
                    throw new Error("Unauthorized Access");
                }
            }
        } catch (error) {
            throw error;
        };
    };

    static async changePW(id, newPassword, userDetails) {
        console.log(`Change password accessed id: ${id}`)
        try{
            await Validate.isInputValid(parseInt(id));
            if (id != userDetails.id){
                throw new Error("Incorrect id");
            } else {
                await Validate.isInputValid(newPassword);
                const result = await pool.query(Query.getUserPasswordQuery, [id]);
                const isPasswordSame = this.#isPasswordCorrect(newPassword, result.rows[0].password);
                if(isPasswordSame === false){
                    const hashPassword = this.#hashPassword(newPassword, 10);
                    const updateResult = await pool.query(Query.changePasswordQuery, [hashPassword, id]);
                    if (updateResult.rowCount === 1) {
                        return true;
                    } else {
                        throw new Error("Update unsuccessful");
                    }
                } else if (isPasswordSame === true){
                    throw new Error("Same password");
                }
            }
        } catch (error){
            throw error;
        };
    };

    static async toAdmin(id) {
        console.log(`User toAdmin accessed id: ${id}`)
        try {
            await Validate.isInputValid(parseInt(id));
            const result = await pool.query(Query.changeUserToAdminQuery, [id]);
            if(result.rows[0].id === id && result.rows[0].is_admin === true){
                return result;
            } else {
                throw new Error("Update unsuccessful");
            }
        } catch (error){
            throw error;
        };
    };

    static #hashPassword (password){
        return bcrypt.hashSync(password, 10);
    };

    static #isPasswordCorrect(password, oldPassword){
        return bcrypt.compareSync(password, oldPassword);
    };

};

export default User;