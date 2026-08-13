import jwt from "jsonwebtoken";
import crypto from "crypto"
import { config } from "./env.config.js";

export function createAccessToken(userId, role) {
    return jwt.sign(
        {
            userId, role, type: "access"
        },
        config.ACCESS_TOKEN,
        {
            expiresIn: "15m"
        }
    )
}

export function createRefreshToken(userId, role) {
    return jwt.sign(
        {
            userId, role, type: "refresh"
        },
        config.REFRESH_TOKEN,
        {
            expiresIn: "7d"
        }
    )
}

export function createCsrfToken() {
    return crypto.randomBytes(32).toString('hex')
}