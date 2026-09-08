import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function History(){

  const[sidebar,setSidebar]=useState(false)
  const[history,setHistory]=useState([])
  const[loading,setLoading]=useState(true)
  const[search,setSearch]=useState("")
  const navigate = useNavigate()
  const[userName,setUserName]=useState("")
  const[userEmail,setUserEmail]=useState("")

  function goTo(path){
    navigate(path)
    setSidebar(false)
  }

  useEffect(function(){
    fetchHistory()
  },[])

  useEffect(function(){
  const savedEmail=localStorage.getItem("userEmail")
  if(savedEmail){
    axios.get("bulk-mail-fswd.vercel.app/user/"+savedEmail)
    .then(function(data){
      setUserName(data.data.name)
      setUserEmail(data.data.emailid)
    })
    .catch(function(err){
      console.log(err)
    })
  }
},[])

  function fetchHistory(){
    setLoading(true)
    axios.get("bulk-mail-fswd.vercel.app/emailhistory")
    .then(function(data){
      setHistory(data.data)
      setLoading(false)
    })
    .catch(function(err){
      console.log(err)
      setLoading(false)
    })
  }

  const filtered = history.filter(function(item){
    const subject = (item.subject || "").toLowerCase()
    const to = (item.emailTo || "").toLowerCase()
    return subject.includes(search.toLowerCase()) || to.includes(search.toLowerCase())
  })

  return(

  <div className="min-h-screen w-full bg-gray-100 flex">

  {/* MOBILE MENU BUTTON */}
  {!sidebar && (
    <button
      onClick={()=>{setSidebar(true)}}
      className="md:hidden fixed top-4 left-4 z-50 text-2xl bg-blue-700 text-white p-3 rounded-lg">
      <i className="fa-solid fa-bars"></i>
    </button>
  )}

  {/* MOBILE OVERLAY */}
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

      <div onClick={function(){goTo(" ")}}
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

  {/* MAIN CONTENT */}
  <div className="w-full md:ml-64 pt-20 p-4 sm:pt-6 sm:p-6 md:p-8 ">

    {/* HEADER */}
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className=" text-2xl sm:text-3xl font-bold text-gray-800 "> Email History </h1>
        <p className=" text-sm sm:text-base text-gray-500 mt-1 "> Previously sent bulk emails </p>
      </div>

      <div className="relative w-full sm:w-72">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input type="text" placeholder="Search by subject or recipient" value={search}
          onChange={function(e){setSearch(e.target.value)}}
          className="w-full border border-gray-300 rounded-lg py-2.5 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-800 bg-white" />
      </div>
    </div>

    {/* LOADING */}
    {loading && (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center text-gray-400">
        <i className="fa-solid fa-spinner fa-spin text-2xl mb-3"></i>
        <p>Loading history...</p>
      </div>
    )}

    {/* EMPTY STATE */}
    {!loading && filtered.length === 0 && (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10 text-center">
        <i className="fa-solid fa-inbox text-3xl text-gray-300 mb-3"></i>
        <p className="text-gray-600 font-semibold">No emails sent yet</p>
        <p className="text-sm text-gray-400 mt-1">Emails you send from the dashboard will show up here.</p>
      </div>
    )}

    {/* TABLE - DESKTOP */}
    {!loading && filtered.length > 0 && (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hidden md:block">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200 text-left text-gray-500">
            <th className="px-6 py-3 font-semibold">Subject</th>
            <th className="px-6 py-3 font-semibold">Recipients</th>
            <th className="px-6 py-3 font-semibold">Date Sent</th>
            <th className="px-6 py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(function(item,index){
            return(
            <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-800 font-medium">{item.subject}</td>
              <td className="px-6 py-4 text-gray-600">
                {item.emailTo}
                {item.emailList && item.emailList.length > 0 &&
                  <span className="text-gray-400"> +{item.emailList.length} from file</span>}
              </td>
              <td className="px-6 py-4 text-gray-600">{item.date}</td>
              <td className="px-6 py-4">
                {item.status === "sent" ? (
                  <span className="inline-flex items-center gap-1.5 text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full text-xs font-semibold">
                    <i className="fa-solid fa-circle-check"></i> Sent
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-red-700 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full text-xs font-semibold">
                    <i className="fa-solid fa-circle-xmark"></i> Failed
                  </span>
                )}
              </td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    )}

    {/* CARDS - MOBILE */}
    {!loading && filtered.length > 0 && (
    <div className="md:hidden flex flex-col gap-3">
      {filtered.map(function(item,index){
        return(
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-start justify-between gap-3">
            <p className="font-semibold text-gray-800 text-sm">{item.subject}</p>
            {item.status === "sent" ? (
              <span className="shrink-0 inline-flex items-center gap-1.5 text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full text-xs font-semibold">
                <i className="fa-solid fa-circle-check"></i> Sent
              </span>
            ) : (
              <span className="shrink-0 inline-flex items-center gap-1.5 text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full text-xs font-semibold">
                <i className="fa-solid fa-circle-xmark"></i> Failed
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2 break-words">{item.emailTo}
            {item.emailList && item.emailList.length > 0 &&
              <span> +{item.emailList.length} from file</span>}
          </p>
          <p className="text-xs text-gray-400 mt-2">{item.date}</p>
        </div>
        )
      })}
    </div>
    )}

  </div>
</div>
    )
}

export default History