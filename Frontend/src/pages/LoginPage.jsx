import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import FloatingShape from "../components/FloatingShape"



const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const { login, isLoading, error } = useAuthStore();


  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-200 flex items-center justify-center relative overflow-hidden">
      <FloatingShape color='bg-neutral-900' size='w-64 h-64' top='-5%' left='10%' delay={0} />
      <FloatingShape color='bg-neutral-900' size='w-48 h-48' top='70%' left='80%' delay={5} />
      <FloatingShape color='bg-zinc-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
      >
        <div className='p-8'>
          <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-light-400 to-zinc-500 text-transparent bg-clip-text'>
            Welcome Back
          </h2>

          <form onSubmit={handleLogin}>
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

            <div className='flex items-center mb-6'>
              <Link to='/forgot-password' className='text-sm text-zinc-200 hover:underline'>
                Forgot password?
              </Link>
            </div>
            {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='w-full py-3 px-4 bg-zinc-400 text-white font-bold rounded-lg shadow-lg hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-100 transition duration-200'
              type='submit'
              disabled={isLoading}
            >
              {isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Login"}
            </motion.button>
          </form>
        </div>
        <div className='px-8 py-4 bg-zinc-50 bg-opacity-50 flex justify-center'>
          <p className='text-sm text-zinc-700'>
            Don't have an account?{" "}
            <Link to='/signup' className='text-white hover:underline'>
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>

  )
}

export default LoginPage
