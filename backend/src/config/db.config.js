import mongoose from "mongoose";
import { config } from "./env.config.js";

export async function connectDB() {
    try {
        await mongoose.connect(config.DATABASE, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000
        })
        console.log("Db connnected");

    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
}