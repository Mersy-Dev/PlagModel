import User from "../models/user.model.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email.js";



export const signup = async (req, res) => {
    const { username, email, password, role } = req.body;
    try{
        if(!username || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }
        if (role && !["user", "admin"].includes(role)) {
            return res.status(400).json({ success: false, message: "Invalid role specified" });
        }
        const userAlreadyExists = await User.findOne({ email});
        if(userAlreadyExists){
            return res.status(400).json({success:false, message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const newUser = new User({
            username,
            email,
            role: role || "user", // Default role is "user" if not provided
            password: hashedPassword,
            verificationToken,
            verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000
        });

        await newUser.save();       

        //jwt token
        generateTokenAndSetCookie(res, newUser._id);

       await sendVerificationEmail(newUser.email, verificationToken);  // Send verification email to user
        res.status(201).json({
            success:true,       
            message: "User created successfully", 
            user: {
           ...newUser._doc,
            password: undefined,
        }});
    }catch(err){
        res.status(500).json({success:false, message: "Internal Server Error "});
    }
};


export const verifyEmail = async (req, res) => {
	const { code } = req.body;
	try {
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpireAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
		}

		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpireAt = undefined;
		await user.save();

		await sendWelcomeEmail(user.email, user.username);

		res.status(200).json({
			success: true,
			message: "Email verified successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

export const login = async (req, res) => {
    const { email, password, role } = req.body; // Include role in the request body
    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Check if the role matches
        if (role && user.role !== role) {
            return res.status(403).json({ 
                success: false, 
                message: `Access denied for the role "${role}". Contact admin if this is an issue.` 
            });
        }

        // Update the last login time
        user.lastLogin = new Date();
        await user.save();

        // Generate JWT token and set it as a cookie
        generateTokenAndSetCookie(res, user._id);

        // Send response
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined, // Exclude password from the response
            },
        });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpireAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpireAt = resetTokenExpireAt;

		await user.save();

		// send email
		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};



export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpireAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// update password
		const hashedPassword = await bcrypt.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpireAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};


export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};
