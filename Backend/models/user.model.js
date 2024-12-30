import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role : {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },  
    isVerified: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpireAt: Date,
    verificationToken: String,
    verificationTokenExpireAt: Date,
    
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;