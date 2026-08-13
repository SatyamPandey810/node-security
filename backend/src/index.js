import express from "express"
import { config } from "./config/env.config.js"
import userRoute from "./routes/route.js"
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.config.js"
import cors from "cors"

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