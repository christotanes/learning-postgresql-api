import cors from "cors";
import express, { json } from "express";
import userRoutes from "./routes/user.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(json());
app.use("/users", userRoutes);

app.listen(port, () => {
	console.log(`API now running at ${port}`);
})