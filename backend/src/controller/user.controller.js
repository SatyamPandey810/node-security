import bcrypt from "bcrypt";
import { User } from "../model/user.js";
import jwt from "jsonwebtoken"
import { config } from "../config/env.config.js";
import { clearAuthCookies, setAuthCookies } from "../config/cookie.config.js";
import { decodeToken } from "../utils/token.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 1. Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required",
            });
        }

        // 2. Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: [],
        });
    } catch (error) {
        console.error("Create user error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // 3. Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // 4. Generate token

        // 5. Don't return password
        const userResponse = user.toObject();
        delete userResponse.password;

        setAuthCookies(req, res, user._id, user.role)

        return res.status(200).json({
            success: true,
            message: "Login successful",
            // token,
            // data: userResponse,
        });
    } catch (error) {
        console.error("Login user error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export async function getUser(req, res) {
    try {
        const user = await User.findById(req.authUser?.userId).select("email role isActive")
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        return res.json(user)
    } catch (error) {
        console.error("Get user error:", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export async function logOut(req, res) {
    clearAuthCookies(res)
    return res.json({
        message: "Logout successfully"
    })
}

export async function refresh(req, res) {
    try {
        const refreshToken = req.cookies?.['refresh_token']
        if (!refreshToken) {
            return res.json(401).json({
                message: 'No refresh token'
            })
        }
        decodeToken(refreshToken)
    } catch (error) {

    }

}
