import { config } from "../config/env.config.js";
import jwt from "jsonwebtoken"
export function requireAccessAuth(req, res, next) {
    try {
        const accessToken = req.cookies?.['access_token']

        if (!accessToken) {
            return res.status(401).json({
                message: "Unauthorized user"
            })
        }
        const decode = jwt.verify(accessToken, config.ACCESS_TOKEN)

        if (decode.type !== 'access') {
            return res.status(401).json({
                message: "Unauthorized user"
            })
        }
        req.authUser = {
            userId: decode.userId,
            role: decode.role,
        };
        next();

    } catch (error) {
        console.error("Access auth error:", error.message);
        return res.status(401).json({
            message: "Unauth user"
        })
    }
}

export function requiredRole(role) {
    return (req, res, next) => {
        if (!req.authUser || req.authUser.role !== role) {
            return res.status(403).json({
                message: "Forbidden: you do not have access to this route"
            })
        }
        next()
    }
}