import jwt from "jsonwebtoken"
import { config } from "../config/env.config.js"

export function decodeToken(refreshToken, accesstoken) {
    try {
        if (refreshToken) {
            return jwt.verify(
                refreshToken,
                config.REFRESH_TOKEN
            )
        } else if (accesstoken) {
            return jwt.verify(
                accesstoken,
                config.ACCESS_TOKEN
            )
        }
        return null
    } catch (error) {
        console.error("Token decode error:", error.message);
        return null
    }
}

