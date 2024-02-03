import pool from "../database.js";
import { 
    getUsersQuery,
    getUserByIdQuery,
    registerUserQuery,
    loginUserQuery,
    getUserPasswordQuery,
    changePasswordQuery,
 } from "../util/query.js";
import validateNumInput from "../util/validateInput.js";
import bcrypt from 'bcrypt';

class User {
    static async getAll(){
        try {
            const results = await pool.query(getUsersQuery)
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id){
        try {
            await validateNumInput(parseInt(id));
            const results = await pool.query(getUserByIdQuery, [id]);
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async create({ username, password, email, full_name, contact_number }){
        try {
            const hashPassword = this.#hashPassword(password);
            console.log(hashPassword)
            const contact_int = parseInt(contact_number);
            await validateNumInput(contact_int);
            const results = await pool.query(registerUserQuery, [username, hashPassword, email, full_name, contact_int])
            return results;
        } catch (error) {
            throw error;
        }
    }

    static async login({ email, password }){
        try {
            const results = await pool.query(loginUserQuery, [email]);
            if (results.rowCount === 0) {
                return "User not found";
            } else {
                const isPasswordCorrect = this.#isPasswordCorrect(password, results.rows[0].password);
                if (isPasswordCorrect) {
                    return results;
                } else {
                    return "Unauthorized Access";
                }
            }
        } catch (error) {
            throw error;
        }
    }

    static async changePW(id, newPassword, userDetails){
        try{
            await validateNumInput(parseInt(id));
            if (id != userDetails.id){
                return "Incorrect Id";
            } else {
                const result = await pool.query(getUserPasswordQuery, [id]);
                const isPasswordSame = this.#isPasswordCorrect(newPassword, result.rows[0].password);
                if(isPasswordSame === false){
                    const hashPassword = this.#hashPassword(newPassword, 10);
                    const updateResult = await pool.query(changePasswordQuery, [hashPassword, id]);
                    if (updateResult.rowCount === 1) {
                        return true;
                    }
                } else if (isPasswordSame === true){
                    return "Same password"
                }
            }
        } catch (error){
            throw error;
        }
    }

    static #hashPassword (password){
        return bcrypt.hashSync(password, 10);
    }

    static #isPasswordCorrect(password, oldPassword){
        return bcrypt.compareSync(password, oldPassword);
    }

}

export default User;