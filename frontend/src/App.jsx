import Dashboard from "./Component/Dashboard.jsx"
import Login from "./Component/Login.jsx"
import Signup from "./Component/Signup.jsx"
import History from "./Component/History.jsx"
import Home from "./Component/Home.jsx"
import { BrowserRouter,Routes, Route } from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/dash" element={<Dashboard/>}/>
      <Route path="/history" element={<History/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
