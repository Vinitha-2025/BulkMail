import { useState, useEffect } from "react"
import * as XLSX from "xlsx"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Dashboard(){

  const[subject,setSub]=useState("")
  const[msg,setMsg]=useState("")
  const[emailList,setEmail]=useState([])
  const[emailTo,setEmailTo]=useState("")
  const[success,setSuccess]=useState(false)
  const[fail,setFail]=useState(false)
  const[sidebar,setSidebar]=useState(false)
  const[status,setStatus]=useState(false)
  const navigate = useNavigate()
  const[userName,setUserName]=useState("")
  const[userEmail,setUserEmail]=useState("")

  function goTo(path){
    navigate(path)
    setSidebar(false)
  }

  function handleSubject(e){
    setSub(e.target.value)
  }

  function handleMsg(e){
    setMsg(e.target.value)
  }

  function handleRecipient(e){
    setEmailTo(e.target.value)
  }

  useEffect(function(){
  const savedEmail=localStorage.getItem("userEmail")
  if(savedEmail){
    axios.get("https://bulk-mail-fswd.vercel.app/user/"+savedEmail)
    .then(function(data){
      setUserName(data.data.name)
      setUserEmail(data.data.emailid)
    })
    .catch(function(err){
      console.log(err)
    })
  }
},[])

  function handleFile(e){
    const file=e.target.files[0]
    const reader=new FileReader()

    reader.onload=function(e){
        const data=e.target.result
        const workbook=XLSX.read(data,{type:"binary"})
        const sheetName=workbook.SheetNames[0]
        const worksheet=workbook.Sheets[sheetName]
        const emailList=XLSX.utils.sheet_to_json(worksheet,{header:'A'})
        const totalemail=emailList.map(function(item){return item.A})
        console.log(totalemail)
        setEmail(totalemail)
    }

    reader.readAsBinaryString(file)
  }

  function send(){
    setStatus(true)
    axios.post("https://bulk-mail-fswd.vercel.app/sendemail",{msg:msg, emailList:emailList, subject:subject, emailTo:emailTo})
    .then(function(data){
      if(data.data === true){
        setStatus(false)
        setSuccess(true)
        setFail(false)
        setTimeout(function(){
          setSuccess(false)
        }, 5000)
        console.log("Email Send Successfully")
      } else{
        setFail(true)
        setSuccess(false)
        setTimeout(function(){
          setFail(false)
        }, 5000)
        console.log("Failed")
      }
    })
  }

    return(

  <div className="min-h-screen w-full bg-gray-100 flex">

  {/* MOBILE MENU BUTTON */}
  {!sidebar && (
    <button
      onClick={()=>{setSidebar(true)}}
      className="md:hidden fixed top-4 left-4 z-50 text-xl bg-blue-700 text-white p-2 rounded-lg">
      <i className="fa-solid fa-bars"></i>
    </button>
  )}

  {/* MOBILE OVERLAY (click to close sidebar) */}
  {sidebar && (
    <div
      onClick={()=>{setSidebar(false)}}
      className="md:hidden fixed inset-0 bg-black/40 z-40">
    </div>
  )}

  {/* LEFT SIDEBAR */}
  <div className={`w-64 min-h-screen fixed left-0 top-0 bottom-0 flex-col bg-white z-50 ${sidebar?"flex":"hidden"} md:flex`}>

    {/* CLOSE MENU BUTTON */}
    <button onClick={()=>{setSidebar(false)}}
      className="md:hidden absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-800">
      <i className="fa-solid fa-xmark"></i>
    </button>

    {/* LOGO */}
    <div className="p-6 bg-blue-700">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center ">
          <i className="fa-solid fa-envelope text-4xl text-blue-700"></i>
        </div>
        <div>
          <h1 className="font-bold text-white text-xl"> Bulk Mail </h1>
          <p className="text-xs text-blue-200">  Mails to many </p>
        </div>
      </div>
    </div>

    {/* NAVIGATION */}
    <div className="flex-1 px-4 mt-6">
      <div onClick={function(){goTo("/dash")} }
        className=" w-full flex cursor-pointer items-center gap-3 px-4 py-3 rounded-lg border border-blue-200 hover:bg-blue-700 hover:text-white">
        <i className="fa-solid fa-house"></i>
        <span>Dashboard</span>
      </div>

      <div onClick={function(){goTo("/history")}}
         className="w-full flex cursor-pointer items-center gap-3 px-4 py-3 mt-2 rounded-lg border border-blue-200 hover:bg-blue-700 hover:text-white">
        <i className="fa-solid fa-clock-rotate-left"></i>
        <span>Email History</span>
      </div>

      <div onClick={function(){goTo("/dash")}}
      className="w-full flex cursor-pointer items-center gap-3 px-4 py-3 mt-2 rounded-lg border border-blue-200 hover:bg-blue-700 hover:text-white">
        <i className="fa-solid fa-circle-question"></i>
        <span>Help & Support</span>
      </div>
    </div>

    {/* USER */}
<div className="p-4 border-t border-blue-700">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold ">
      {userName ? userName.charAt(0).toUpperCase() : "U"}
    </div>
    <div className="min-w-0">
      <p className="font-semibold truncate">{userName || "User"}</p>
      <p className="text-xs text-blue-700 truncate">{userEmail}</p>
    </div>
    <div className="text-xs">
      <span onClick={function(){localStorage.clear(); navigate("/")}}
        className="cursor-pointer hover:text-blue-700"> Sign Out</span>
    </div>
  </div>
</div>

  </div>

  {/* EMAIL CARD */}
  <div className="w-full md:ml-64 pt-20 p-4 sm:pt-6 sm:p-6 md:p-8 ">

    {/* HEADER */}
    <div className="mb-6">
      <h1 className=" text-2xl sm:text-3xl font-bold text-gray-800 "> Compose Email </h1>
      <p className=" text-sm sm:text-base text-gray-500 mt-1 "> Bulk mails to your recipients </p>
    </div>

    <div className=" bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8 w-full max-w-4xl ">

       {/* SUBJECT   */}
      <div className="mb-5">
        <label className=" block font-semibold text-gray-700 text-sm sm:text-base mb-2 "> Subject </label>
        <div className="relative">
          <i className=" fa-solid fa-heading absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 "></i>
          <input type="text" placeholder="Enter email subject" value={subject} onChange={handleSubject}
            className=" w-full border border-gray-300 rounded-lg py-3 pl-11 pr-4
              text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-800 " />
        </div>
      </div>

      {/* RECIPIENT EMAILS */}
      <div className="mb-5">
        <label className=" block font-semibold text-gray-700 text-sm sm:text-base mb-2 "> Recipient Emails </label>
        <div className="relative">
          <i className=" fa-solid fa-users absolute left-4 top-4 text-gray-400 "></i>
          <textarea placeholder="Enter multiple email addresses separated by commas" rows="4" value={emailTo} onChange={handleRecipient}
            className=" w-full border border-gray-300 rounded-lg py-3 pl-11 pr-4 text-sm sm:text-base outline-none resize-none focus:ring-2 focus:ring-blue-800"></textarea>
        </div>
        <p className="text-xs text-gray-400 mt-2"> Example: abc@gmail.com, xyz@gmail.com, test@gmail.com</p>
      </div>

      {/* Drag and Drop */}
      <div className="mb-5">
        <label className=" block font-semibold text-gray-700 text-sm sm:text-base mb-2 "> Drag and Drop </label>
        <div className="relative">
          <i className=" fa-solid fa-file absolute left-4 top-4 text-gray-400 "></i>
          <input type="file" onChange={handleFile}
            className=" w-full h-14 border border-gray-300 rounded-lg py-3 pl-11 pr-4 text-sm sm:text-base outline-none resize-none focus:ring-2 focus:ring-blue-800" />
        </div>
        <p className="text-sm font-semibold text-gray-700 mt-2">Total Emails in the file : {emailList.length}</p>
      </div>

      {/* EMAIL BODY */}
      <div className="mb-5">
        <label className=" block font-semibold text-gray-700 text-sm sm:text-base mb-2 "> Email Body </label>
        <div className="relative">
          <i className=" fa-solid fa-message absolute left-4 top-4 text-gray-400 "></i>
          <textarea placeholder="Write your email message..." rows="8" value={msg} onChange={handleMsg}
            className=" w-full border border-gray-300 rounded-lg py-3 pl-11 pr-4 text-sm sm:text-base outline-none resize-none focus:ring-2 focus:ring-blue-800 " ></textarea>
        </div>
      </div>

      {/* STATUS MESSAGE */}
      {
      success?  (
      <div className=" flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 rounded-lg p-4  mb-5 ">
        <i className="fa-solid fa-circle-check mt-1"></i>
        <div>
          <p className="font-semibold text-sm sm:text-base"> Email sent successfully!</p>
          <p className="text-xs sm:text-sm"> Your bulk emails have been sent to the recipients.</p>
        </div>
      </div>) : ""}

      {
      fail? (
      <div className=" flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4  mb-5 ">
        <i className="fa-solid fa-circle-xmark mt-1"></i>
        <div>
          <p className="font-semibold text-sm sm:text-base"> Email sending faild!</p>
          <p className="text-xs sm:text-sm"> Your bulk emails could not be sent. Please try again.</p>
        </div>
      </div>) : ""}

      {/* SEND BUTTON */}
      <button onClick={send} className=" w-full sm:w-auto bg-blue-800 hover:bg-blue-900 text-white font-semibold px-7 py-3 rounded-lg transition text-sm sm:text-base ">
        <i className="fa-solid fa-paper-plane mr-2"></i> {status?"Sending...":"Send Bulk Email"}
      </button>
    </div>


  </div>
</div>
    )
}

export default Dashboard