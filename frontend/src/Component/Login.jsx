import { useState } from "react"
import bgImage from "../assets/images/bgimg.png";
import axios from 'axios'
import { useNavigate } from "react-router-dom"

function Login(){

    const[email,setEmail]=useState("")
    const[pass,setPass]=useState("")
    const[color,setcolor]=useState(true)
    const[showpass,setshow]=useState(false)
    const[para,setpara]=useState(false)
    const[option,setoption]=useState(false)
    const[error,seterror]=useState(false)
    const[arrow,setarrow]=useState(false)

    const navigate=useNavigate()

  function handleEmail(e){
    setEmail(e.target.value)
    seterror(false)
  }

  function handlePass(e){
    setPass(e.target.value)
    seterror(false)
  }

    const handleShow=()=>{
        setshow(!showpass)
    }

    const handleArrow=()=>{
        setarrow(!arrow)
    }

    const handleOption=()=>{
        setoption(!option)
    }

    const handleSign=()=>{
        navigate("/signup")
    }

  

    const handleCheck=()=>{
        const emailRegex=/^[a-zA-Z0-9]+@gmail\.com$/

        if(!emailRegex.test(email)){
            setcolor(false)
            setpara(true)
            return
        } 
        setcolor(true)
        setpara(false)
        seterror(false)
        const logindetails=axios.post("https://bulk-mail-fswd.vercel.app/login",{"emailid":email, "passid":pass})
        logindetails.then(function(data){
            if(data.data.success){
              // localStorage.setItem("userName", data.data.name)
              localStorage.setItem("userEmail", data.data.emailid)
              navigate("/dash")
            } else{
                seterror(true)
            }
      })
    }
    
    return(
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 sm:px-6 md:px-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="ml-auto mr-auto p-2 sm:p-4 md:p-6 text-center bg-white w-3/4 md:mt-10 max-w-md rounded-xl">

        <h1>
          <i className="fa-solid fa-envelope mt-2 text-5xl md:text-6xl lg:text-7xl text-blue-800"></i>
        </h1>

        <h2 className="mt-3 font-bold text-xl sm:text-2xl md:text-3xl">
          Welcome Back!
        </h2>

        <h2 className="m-2 mb-10 text-sm sm:text-base md:text-xl">
          Login to your account and start sending{" "}
          <br className="hidden sm:block" />
          bulk mails in minutes.
        </h2>

        <div className="w-full p-2 m-auto">

          {/* Email */}
          <label className="block font-semibold text-left text-sm sm:text-base">
            Email Address
          </label>

          <div className="relative">
            <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

            <input
              type="text" value={email} onChange={handleEmail}
              placeholder="Enter your email"
              className={`w-full border border-gray-300 rounded-lg py-2.5 sm:py-3 pl-11 pr-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-indigo-500 ${color? "outline-white" : "outline-red-600"}`}
            />
          </div>
          
              {
                para ? (<p className="text-red-600 mt-2 text-left">
                     <i className="fa-regular fa-circle-xmark text-red-600 font-light"> </i>
                Please enter a valid email</p>): null
             } 

          {/* Password */}
          <label className="block mt-2 font-semibold text-left text-sm sm:text-base">
            Password
          </label>

          <div className="relative">
            <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
{
                pass? (
             <i onClick={handleShow}  
             className={`fa-regular fa-eye-slash text-gray-500 cursor-pointer absolute right-3 bottom-5
                ${showpass ? "fa-regular fa-eye-slash" :"fa-regular fa-eye"}`}></i>
                ) : null
            }
             {/* <i className="fa-solid fa-eye absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"></i> */}

            <input
              type={showpass? "text" : "password"} value={pass} onChange={handlePass}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg py-2.5 sm:py-3 pl-11 pr-11 text-sm sm:text-base outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {/* {
                pass? (
             <i onClick={handleShow}  
             className={`fa-regular fa-eye text-gray-500 absolute right-3 bottom-5
                ${showpass ? "fa-regular fa-eye-slash" :"fa-regular fa-eye"}`}></i>
                ) : null
            } */}

          </div>

          {/* Login Button */}
          <button onClick={handleCheck}
            className="w-full bg-blue-800 cursor-pointer rounded-lg py-2.5 sm:py-3 mt-5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-indigo-500 text-white font-bold text-center"
          >
            Login
          </button>
            {
                error ? (<p className="text-red-600 mt-2 text-left">
                     <i className="fa-regular fa-circle-xmark text-red-600 font-light"> 
                        </i>  Wrong email or password</p>): null
             }

          {/* OR */}
          <p className="m-3 text-sm sm:text-base">
            Or
          </p>

          {/* Google */}
          <p className="w-full border border-gray-300 cursor-pointer rounded-lg py-2.5 sm:py-3 mb-3 text-sm sm:text-base">
            <i className="fa-brands fa-google"></i>
            &nbsp; Continue with Google
          </p>

          {/* Signup */}
          <p className="text-sm sm:text-base">
            Don't have an account? <span className="text-blue-800 font-semibold"> 
              <span onClick={handleSign} className=" cursor-pointer"> Sign up
            </span> </span>
          </p>

        </div>
      </div>
    </div>

    )
}

export default Login