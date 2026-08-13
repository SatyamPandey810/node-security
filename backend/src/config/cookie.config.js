import { config } from "./env.config.js"
import path from "path"
import { createAccessToken, createCsrfToken, createRefreshToken } from "./jwt.config.js"

const ACCESS_COOKIE = "access_token"
const REFRESH_COOKIE = "refresh_token"
const CSRF_COOKIE = "csrf_token"



function createCookieoption(maxAge) {
    return {
        httpOnly: true,
        secure: config.COOKIESECURE,
        sameSite: config.COOKIE_SAMESITE === 'strict' || config.COOKIE_SAMESITE === 'none' || config.COOKIE_SAMESITE === 'lax' ? config.COOKIE_SAMESITE : 'lax',
        path: '/',
        maxAge
    }
}

function createCsrfCookieoption(maxAge) {
    return {
        httpOnly: false,
        secure: config.COOKIESECURE,
        sameSite: config.COOKIE_SAMESITE,
        path: '/',
        maxAge
    }
}

export function setAuthCookies(req, res, userId, role) {
    const accessToken = createAccessToken(userId, role)
    const refreshToken = createRefreshToken(userId, role)
    const csrfToken = createCsrfToken(userId, role)

    const accessMaxAge = 15 * 60 * 1000
    const refreshMaxAge = 7 * 24 * 60 * 60 * 1000

    res.cookie(ACCESS_COOKIE, accessToken, createCookieoption(accessMaxAge))
    res.cookie(REFRESH_COOKIE, refreshToken, createCookieoption(refreshMaxAge))
    res.cookie(CSRF_COOKIE, csrfToken, createCookieoption(refreshMaxAge))
}

export function clearAuthCookies(req, res) {
    const clearOption = {
        secure: COOKIE_SECURE,
        sameSite: COOKIE_SAMESITE,
        path: '/'
    }
    res.clearCookie(ACCESS_COOKIE, clearOption)
    res.clearCookie(REFRESH_COOKIE, clearOption)
    res.clearCookie(CSRF_COOKIE, clearOption)
}

export function requireCsrf(req, res, next) {
    const csrfCookie = req.cookies?.[CSRF_COOKIE]
    const csrfHeader = req.header('x-csrf-token')

    if (csrfCookie || csrfHeader || csrfCookie !== csrfHeader) {
        return res.status(403).json({
            message: "Invalid csrf token"
        })
    }
    next();
}




