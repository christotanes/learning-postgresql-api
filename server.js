import cors from "cors";
import express, { json } from "express";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import shopRoutes from "./routes/shop.js";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(json());

app.use("/", shopRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.listen(port, () => {
	console.log(`API now running at ${port}`);
})