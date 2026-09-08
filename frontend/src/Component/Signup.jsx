import { useNavigate } from "react-router-dom";
import bgImage from "../assets/images/bgimg.png";
import { useState } from "react"
import axios from "axios"

function Signup(){


   const navigate=useNavigate()

    const[name,setName]=useState("")
    const[newemail,setNew]=useState("")
    const[password,setPassword]=useState("")
    const[conpass,setconpass]=useState("")

    const[color,setcolor]=useState(true)
    const[showpass,setshow]=useState(false)
    const[showconpass,setshowcon]=useState(false)
    const[para,setpara]=useState(false)
    const[wrongpass,setwrong]=useState(true)
    const[empty,setempty]=useState(false)

    const handleName=(e)=>{
        setName(e.target.value)
    }

    const handleNewEmail=(e)=>{
        setNew(e.target.value)
    }

    const handlePassword=(e)=>{
        setPassword(e.target.value)
    }

    const handleConfirm=(e)=>{
        setconpass(e.target.value)
    }

    const handleShow=()=>{
        setshow(!showpass)
    }

    const handleShowcon=()=>{
        setshowcon(!showconpass)
    }

    const handleCheck=()=>{
        const emailRegex=/^[a-zA-Z0-9]+@gmail\.com$/

        if(emailRegex.test(newemail)){
            setcolor(true)
            setpara(false)
        } else{
            setcolor(false)
            setpara(true)
            return
        }

        if (password === "" || conpass === "") {
           setempty(true)
           return
        } else{
            setempty(false)
        }

        if(password!== conpass){
            setwrong(false)
            return
        } else{
            setwrong(true)
        }

        const signupdetails=axios.post("bulk-mail-fswd.vercel.app/signup",{"name":name, "emailid":newemail, "passid":password})
signupdetails.then(function(data){
        if(data.data){
            navigate("/login")
        } else{
            setpara(true)
        }
}).catch(function(err){
        console.log(err)
        setpara(true)
})
    }
    return(
        <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 sm:px-6 md:px-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="ml-auto mt-10 mr-auto p-2 sm:p-4 md:p-6 text-center bg-white w-3/4 md:mt-10 md:mb-5 max-w-md rounded-xl">

        <h1>
          <i className="fa-solid fa-envelope mt-2 text-5xl md:text-6xl lg:text-7xl text-blue-800"></i>
        </h1>

        <h2 className="mt-3 font-bold text-xl sm:text-2xl md:text-3xl">
          Create Your Account
        </h2>

        <h2 className="m-2 mb-10 text-sm sm:text-base md:text-xl">
          Join us and start sending bulk emails{" "}
          <br className="hidden sm:block" />
          with ease.
        </h2>

        <div className="w-full p-2 m-auto">

            {/* Full Name */}
          <label className="block font-semibold text-left text-sm sm:text-base">
            Full name
          </label>

          <div className="relative">
            <i className="fa-solid fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

            <input
              type="text" value={name} onChange={handleName}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg py-2.5 sm:py-3 pl-11 pr-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <label className="block mt-2 font-semibold text-left text-sm sm:text-base">
            Email Address
          </label>

          <div className="relative">
            <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

            <input
              type="text" value={newemail} onChange={handleNewEmail}
              placeholder="Enter your email"
              className={`w-full border border-gray-300 rounded-lg py-2.5 sm:py-3 pl-11 pr-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-indigo-500 ${color? "outline-white" : "outline-red-600"}`}
            />
              {
                para ? (<p className="text-red-600 mt-2 text-left">
                     <i className="fa-regular fa-circle-xmark text-red-600 font-light"> </i>
                Please enter a valid email</p>): null
             } 
          </div>

          {/* Password */}
          <label className="block mt-2 font-semibold text-left text-sm sm:text-base">
            Password
          </label>

          <div className="relative">
            <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

            {/* <i className="fa-solid fa-eye absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"></i> */}

            <input
              type={showpass? "text" : "password"} value={password} onChange={handlePassword}
              placeholder="Create a password"
              className="w-full border border-gray-300 rounded-lg py-2.5 sm:py-3 pl-11 pr-11 text-sm sm:text-base outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {
                password? (
             <i onClick={handleShow}  
             className={`fa-regular fa-eye-slash cursor-pointer text-gray-500 absolute right-3 bottom-5
                ${showpass ? "fa-regular fa-eye-slash" :"fa-regular fa-eye"}`}></i>
                ) : null
            }
          </div>

          {/* Confirm Password */}
          <label className="block mt-2 font-semibold cursor-pointer text-left text-sm sm:text-base">
            Confirm Password
          </label>

          <div className="relative">
            <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

            {/* <i className="fa-solid fa-eye absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"></i> */}

            <input
              type={showconpass? "text" : "password"} value={conpass} onChange={handleConfirm}
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-lg py-2.5 sm:py-3 pl-11 pr-11 text-sm sm:text-base outline-none focus:ring-2 focus:ring-indigo-500"
            />{
               conpass? (
             <i onClick={handleShowcon}  
             className={`fa-regular fa-eye-slash text-gray-500 absolute right-3 bottom-5
                ${showconpass ? "fa-regular fa-eye-slash" :"fa-regular fa-eye"}`}></i>
                ) : null
            } 
          </div>

          {
                wrongpass ? null : (<p className="text-red-600 mt-2 text-left">
                     <i className="fa-regular fa-circle-xmark text-red-600 font-light"> </i>
                Passwords do not match</p>)
             }
            {
                empty ? (<p className="text-red-600 mt-2 text-left">
                     <i className="fa-regular fa-circle-xmark text-red-600 font-light"> </i>
                Please enter a password</p>) : null
            }

          {/* Login Button */}
          <button onClick={handleCheck}
            className="w-full bg-blue-800 rounded-lg py-2.5 sm:py-3 mt-5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-indigo-500 text-white font-bold text-center"
          >
            Sign up
          </button>

          {/* OR */}
          <p className="m-3 text-sm sm:text-base">
            Or
          </p>

          {/* Google */}
          <p className="w-full border border-gray-300 rounded-lg py-2.5 sm:py-3 mb-3 text-sm sm:text-base">
            <i className="fa-brands fa-google"></i>
            &nbsp; Sign up with Google
          </p>

          {/* Signup */}
          <p className="text-sm sm:text-base">
            Already have an account? <span className="text-blue-800 font-semibold"> Login
            </span>
          </p>

        </div>
      </div>
    </div>
    )
}

export default Signup