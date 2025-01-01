import { useState } from "react";
import { motion } from 'framer-motion'
import { Loader, Lock, Mail, User } from "lucide-react";
import Input from '../components/Input'
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";






const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

const { signup, error, isLoading } = useAuthStore();



    const handleSignup = async (e) => {
		e.preventDefault();

        try {
			await signup(email, password, username);
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden'
        >

            <div className="p-8">
                <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-light-400 to-zinc-500 text-transparent bg-clip-text'>
                    Create Account
                </h2>

                <form onSubmit={handleSignup}>
                    <Input
                        icon={User}
                        type='text'
                        placeholder='Username'
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <Input
                        icon={Mail}
                        type='email'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        icon={Lock}
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                    <PasswordStrengthMeter password={password} />


                    <motion.button
                        className='mt-5 w-full py-3 px-4 bg-zinc-400 text-white font-bold rounded-lg shadow-lg hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-100 transition duration-200'
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className='animate-spin mx-auto' size={24} /> : "Sign Up"}
                    </motion.button>

                </form>
            </div>
            <div className='px-8 py-4 bg-zinc-50 bg-opacity-50 flex justify-center'>
                <p className='text-sm text-zinc-700'>
                    Already have an account?{" "}
                    <Link to={"/login"} className='text-white hover:underline'>
                        Login 
                    </Link>
                </p>
            </div>

        </motion.div>

    )
}

export default SignUpPage
