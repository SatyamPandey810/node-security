import express from "express"
import { config } from "./config/env.config.js"
import userRoute from "./routes/route.js"
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.config.js"
import cors from "cors"
import os from "os"

const app = express()

app.use(cors({
    origin(origin, callback) {
        if (!origin) {
            return callback(null, true)
        }
        if (config.CORSALLOWED?.includes(origin)) {
            return callback(null, true)
        }
        return callback(new Error("Not allowed by CORS"));

    },
    credentials: true
}))
app.use(cookieParser())

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({
    limit: "100mb",
    extended: true
}));
app.use("/api/user", userRoute)

app.get('/health', (req, res) => {
    return res.status(200).json({
        timestamp: new Date().toLocaleString('en-IN'),
        uptime: `${Math.floor(process.uptime() / 86400)}d ${new Date((process.uptime() % 86400) * 1000)
            .toISOString()
            .slice(11, 19)}`,
        cpuUsage: os.loadavg(),
        totalMemory: `${((os.totalmem) / 1024 / 1024).toFixed(2)} MB`,
        freeMemory: `${((os.freemem) / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
    })

})



const port = config.PORT || 7000

async function startServer() {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`server running on port ${port}`);
        });
    } catch (error) {
        console.log("Server Startup Failed:", error);
        process.exit(1);
    }
}

startServer();