import dotenv from "dotenv";
import connectDB from "./lib/connectDB.js";
import express from "express";
import animalRoutes from "./routes/animal.route.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors(process.env.CLIENT_URL));
app.use(express.json());

app.use("/animals", animalRoutes);

app.use((error, req, res, next) => {
    res.status(error.status || 500);

    res.json({
        message: error.message || "Something went wrong!",
        status: error.status,
        stack: error.stack,
    });
});

app.listen(3000, () => {
    connectDB();
    console.log('Server is running on port 3000');
});