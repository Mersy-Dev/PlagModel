import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connect } from "mongoose";
import { connectDB } from "./db/connectDB.js";


import authRoutes from "./routes/authRoutes.js";


dotenv.config();
const app  = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // To parse JSON data in request body 
app.use(cookieParser()); // To parse cookies in request headers

app.use("/api/auth", authRoutes);



app.listen(PORT, () => {
    connectDB(); // Connect to database
    console.log("Server is running on port: ", PORT);
});