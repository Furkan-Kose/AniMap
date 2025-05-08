import dotenv from "dotenv";
import connectDB from "./lib/connectDB.js";
import express from "express";
import animalRoutes from "./routes/animal.route.js";
import userRoutes from "./routes/user.route.js";
import campaignRoutes from "./routes/campaign.route.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import { ALL } from "dns";

dotenv.config();

const app = express();
app.use(cors({
    origin: ALL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/animals", animalRoutes);
app.use("/users", userRoutes);
app.use("/campaigns", campaignRoutes);

app.use((error, req, res, next) => {
    res.status(error.status || 500);    

    res.json({
        message: error.message || "Something went wrong!",
        status: error.status,
        stack: error.stack,
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    connectDB(); 
    console.log(`Server is running on port ${port}`);
});
