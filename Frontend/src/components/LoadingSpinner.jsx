import { motion } from "framer-motion";

const LoadingSpinner = () => {
    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-zinc-800 flex items-center justify-center relative overflow-hidden'>
            {/* Simple Loading Spinner */}
            <motion.div
                className='w-16 h-16 border-4 border-t-4 border-t-zinc-500 border-zinc-200 rounded-full'
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                aria-label="Loading"
                role="status"
            />
            <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-zinc-300'>
                Loading...
            </span>
        </div>


    );
}

export default LoadingSpinner
