import express from "express";
import { createUser, getUser, loginUser, logOut } from "../controller/user.controller.js";
import { requireAccessAuth } from "../middleware/auth.js";
const userRoute = express.Router()

userRoute.post("/", createUser)
userRoute.post("/login", loginUser)
userRoute.get('/get-user',requireAccessAuth, getUser)
userRoute.post('/logout', logOut)


export default userRoute