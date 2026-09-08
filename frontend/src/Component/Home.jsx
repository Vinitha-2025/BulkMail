import { useNavigate } from "react-router-dom"
import heroImage from "../assets/images/hero_illustration.png"

function Home(){

  const navigate = useNavigate()

  function goToSignup(){
    navigate("/signup")
  }

  return(
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-50 via-white to-blue-50 overflow-hidden relative">

      {/* DECORATIVE BACKGROUND BLOBS */}
      <div className="absolute -left-24 top-40 w-72 h-72 rounded-full bg-blue-100 opacity-60 blur-2xl"></div>
      <div className="absolute -left-16 bottom-0 w-80 h-80 rounded-full bg-indigo-100 opacity-70 blur-2xl"></div>
      <div className="absolute -right-10 top-10 w-64 h-64 rounded-full bg-indigo-50 opacity-60 blur-2xl"></div>

      {/* NAVBAR */}
      <div className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center">
            <i className="fa-solid fa-envelope text-white text-sm"></i>
          </div>
          <span className="font-bold text-lg text-gray-800">
            Bulk<span className="text-blue-700">Mail</span>
          </span>
        </div>

        <button onClick={goToSignup}
          className="flex items-center gap-2 border border-gray-300 rounded-full px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
          <i className="fa-solid fa-user"></i>
          Sign Up
        </button>
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mt-10 sm:mt-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Send Emails<br/>
          in Bulk,{" "}
          <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            Made Easy
          </span>
        </h1>

        <p className="text-gray-500 text-sm sm:text-base mt-5 max-w-xl mx-auto">
          Connect with your audience, save time, and grow — all with one simple tool.
        </p>

        {/* FEATURE BADGES */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-6">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-bolt"></i>
            </span>
            <span className="text-sm text-gray-600 font-medium">Fast & Reliable</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-shield-halved"></i>
            </span>
            <span className="text-sm text-gray-600 font-medium">Secure</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-users"></i>
            </span>
            <span className="text-sm text-gray-600 font-medium">Easy to Use</span>
          </div>
        </div>
      </div>

      {/* HERO IMAGE */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 mt-10 sm:mt-14 pb-16">
        <img src={heroImage} alt="BulkMail sending illustration"
          className="w-full h-auto select-none pointer-events-none" />
      </div>

    </div>
  )
}

export default Home