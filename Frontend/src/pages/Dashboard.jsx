import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import Header from "../components/Header/Header";
import FloatingShape from "../components/FloatingShape"



import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../pages/Dashbord/dashboard.css"; // Add your custom styles if needed

import PIC1 from "../assets/Anime_1.webp";
import PIC2 from "../assets/Anime_2.webp";
import PIC3 from "../assets/Anime_3.webp";
import FeaturesSection from "./Dashbord/Features/FeaturesSection";








const Dashboard = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };
  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-200 relative overflow-hidden">
        <FloatingShape color='bg-neutral-900' size='w-64 h-64' top='-5%' left='10%' delay={0} />
        <FloatingShape color='bg-neutral-900' size='w-48 h-48' top='70%' left='80%' delay={5} />
        <FloatingShape color='bg-zinc-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
        <div className="">
          <Header />
        </div>

        <div className="flex flex-col-reverse lg:flex-row items-center justify-between mx-auto max-w-7xl px-6 lg:px-8 py-16 gap-8">
          {/* Left Block - Text Content */}
          <div className="lg:w-2/5 text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              More than an AI detector. <br />
              <span className="text-indigo-600">Preserve what's human.</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Since inventing AI detection, GPTZero incorporates the latest research in detecting ChatGPT, GPT4, Google-Gemini, LLaMa, and new AI models, and investigating their sources.
            </p>
            <div className="mt-6">
              <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Block - Image Swiper Carousel */}
          <div className="lg:w-3/5 flex justify-center items-center">
            <div className="w-full h-auto max-w-xl bg-white shadow-lg rounded-lg overflow-hidden" style={{ maxWidth: "600px" }}>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]} // Include Autoplay module
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }} // Auto-swipe every 3 seconds
                spaceBetween={30}
                slidesPerView={1}
                className="w-full h-full"
              >
                <SwiperSlide>
                  <img src={PIC1} alt="AI Detection Illustration 1" className="w-full h-full object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={PIC2} alt="AI Detection Illustration 2" className="w-full h-full object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={PIC3} alt="AI Detection Illustration 3" className="w-full h-full object-cover" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>

        </div>
        <section className="section">
          <div className="fearures-section">
            <FeaturesSection />
          </div>
        </section>





      </div>
    </>

  )
}

export default Dashboard



//   < motion.div
// initial = {{ opacity: 0, scale: 0.9 }}
// animate = {{ opacity: 1, scale: 1 }}
// exit = {{ opacity: 0, scale: 0.9 }}
// transition = {{ duration: 0.5 }}
// className = 'max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-zinc-700'
//   >
//           <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-zinc-400 to-zinc-600 text-transparent bg-clip-text'>
//             Dashboard
//           </h2>

//           <div className='space-y-6'>
//             <motion.div
//               className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-zinc-600'
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//             >
//               <h3 className='text-xl font-semibold text-zinc-400 mb-3'>Profile Information</h3>
//               <p className='text-zinc-300'>Name: {user.username}</p>
//               <p className='text-zinc-300'>Email: {user.email}</p>
//             </motion.div>
//             <motion.div
//               className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-zinc-600'
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//             >
//               <h3 className='text-xl font-semibold text-zinc-400 mb-3'>Account Activity</h3>
//               <p className='text-zinc-300'>
//                 <span className='font-bold'>Joined: </span>
//                 {new Date(user.createdAt).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </p>
//               <p className='text-zinc-300'>
//                 <span className='font-bold'>Last Login: </span>
//                 {formatDate(user.lastLogin)}
//               </p>
//             </motion.div>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             className='mt-4'
//           >
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleLogout}
//               className='w-full py-3 px-4 bg-gradient-to-r from-zinc-500 to-zinc-700 text-white
//                 font-bold rounded-lg shadow-lg hover:from-zinc-600 hover:to-zinc-800
//                 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-gray-900'
//             >
//               Logout
//             </motion.button>
//           </motion.div>
//         </motion.div >