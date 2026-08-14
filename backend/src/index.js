import express from "express";
import { config } from "./config/env.config.js";
import userRoute from "./routes/route.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.config.js";
import cors from "cors";
import os from "os";

const app = express();

console.log("========== SERVER CONFIG ==========");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", config.PORT);
console.log("CORS_ALLOWED:", config.CORSALLOWED);
console.log("DATABASEURL exists:", !!config.DATABASEURL);
console.log("===================================");

// CORS
app.use(
    cors({
        origin(origin, callback) {
            console.log("Incoming Origin:", origin);

            if (!origin) {
                console.log("CORS: No origin -> allowed");
                return callback(null, true);
            }

            console.log("Allowed Origins:", config.CORSALLOWED);

            if (config.CORSALLOWED?.includes(origin)) {
                console.log("CORS: Origin allowed ->", origin);
                return callback(null, true);
            }

            console.log("CORS: Origin rejected ->", origin);
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

app.use(cookieParser());

app.use(express.json({ limit: "100mb" }));

app.use(
    express.urlencoded({
        limit: "100mb",
        extended: true,
    })
);

app.use("/api/user", userRoute);

// Health
app.get("/health", (req, res) => {
    console.log("Health check received");

    return res.status(200).json({
        timestamp: new Date().toLocaleString("en-IN"),
        uptime: `${Math.floor(process.uptime() / 86400)}d ${new Date(
            (process.uptime() % 86400) * 1000
        )
            .toISOString()
            .slice(11, 19)}`,
        cpuUsage: os.loadavg(),
        totalMemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
        freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(
            process.memoryUsage().heapTotal /
            1024 /
            1024
        ).toFixed(2)} MB`,
        heapUsed: `${(
            process.memoryUsage().heapUsed /
            1024 /
            1024
        ).toFixed(2)} MB`,
    });
});

const port = config.PORT || 7000;

async function startServer() {
    console.log("========== SERVER STARTUP ==========");

    try {
        console.log("Connecting to MongoDB...");

        await connectDB();

        console.log("MongoDB connected successfully");

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            console.log(`Port: ${port}`);
            console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
            console.log("====================================");
        });
    } catch (error) {
        console.error("========== SERVER STARTUP FAILED ==========");
        console.error("Error:", error);
        console.error("===========================================");
        process.exit(1);
    }
}

startServer();