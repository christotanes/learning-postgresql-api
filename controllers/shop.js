import Shop from "../Models/Shop";
import { errorHandler } from "../util/errorHandler";

export async function getAllShops(req, res) {
    try {
        const shops = await Shop.getAllShops();
        res.status(200).send(shops);
    } catch (error) {
        errorHandler(error, res);
    };
};