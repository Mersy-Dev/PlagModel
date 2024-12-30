import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import Dashboard from "./pages/Dashboard";


function App() {

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-200 flex items-center justify-center relative overflow-hidden">
        <FloatingShape color='bg-zinc-900' size='w-64 h-64' top='-5%' left='10%' delay={0} />
        <FloatingShape color='bg-sky-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
        <FloatingShape color='bg-zinc-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />

        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/Signup" element={<SignUpPage />} />
          <Route path="/Login" element={<LoginPage />} />
        </Routes>




      </div>

    </>
  )
}

export default App
