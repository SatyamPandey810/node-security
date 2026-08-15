import dotenv from "dotenv";
const envFile = `.env${process.env.NODE_ENV ? '.' + process.env.NODE_ENV : ''}`; 

dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env" });

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DATABASEURL exists:", !!process.env.DATABASEURL);
export const config = {
    env: process.env.ENV,
    PORT: process.env.PORT,
    DATABASE: process.env.DATABASEURL,
    TOKEN: process.env.JWT_SECRET,
    CLIENTSECRET: process.env.CLIENT_SECRET,
    CORSALLOWED: process.env.CORS_ALLOWED_ORIGINS?.split(",") || [],
    COOKIESECURE: process.env.COOKIE_SECURE === "true",
    COOKIE_SAMESITE: process.env.COOKIE_SAME_SITE,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN_SECRET

};