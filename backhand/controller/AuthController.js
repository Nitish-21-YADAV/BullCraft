const { UserModel } = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");


const signup = async (req,res) => {
    try {
        const { name, email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User already exists", success: false });
        }
        const newUser = new UserModel({ name, email, password });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();
        res.status(201).json({
            message: "SignUp successful",
            success: true
        });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({
            message: "Internal server error in signUp",
            success: false,
        });
    }
};

const loginUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(401).json({ message: "Invalid credentials", success: false });
        }
        const jwtToken = JWT.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.name,
            _id:user._id
        });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = { signup, loginUp };
