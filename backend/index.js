import dotenv from "dotenv";
import connectDB from "./lib/connectDB.js";
import express from "express";
import animalRoutes from "./routes/animal.route.js";
import userRoutes from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));
app.use(cookieParser());
app.use(express.json());

app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));

app.use("/animals", animalRoutes);
app.use("/users", userRoutes);

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