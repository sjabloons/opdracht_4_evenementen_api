//Imports packages and modules
import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swagger";

import EventRoutes from "./Routes/EventRoutes.js";

//Variables
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/events", EventRoutes);

//Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

//handle unknown routes
app.all("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

//Database connection
try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Database connection OK");
} catch (error) {
    console.log(error);
    process.exit(1);
}

//server listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} 🚀`);
});
