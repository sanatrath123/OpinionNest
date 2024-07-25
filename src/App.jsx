import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import './App.css'
import authservice from "./appwrite/Auth"
import {login , logout} from "./store/authslice"
import Header  from "./components/header/Header"
import Footer from "./components/footer/Footer"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"


function App() {
  const [loader, setloader]= useState(true)
  const dispatch = useDispatch()
 const authStatus = useSelector(state=>state.auth.status)
//dark light theme 
const theme = useSelector((state)=>state.theme.mode)

  useEffect(()=>{
authservice.getCurrentUser()
  .then((UserData)=>{
    if(UserData)
   { dispatch(login(UserData))}
   else{
dispatch(logout())
   }
  }
  ).finally(()=>
setloader(false))
  })


  return !loader ? (
<div className={`${theme}` }>

<div className="min-h-screen flex flex-wrap content-between dark:bg-gray-800 bg-purple-700">
  <div className="w-full block">
    <Header/>
<main>
  POST:<Outlet />
</main>
    <Footer/>
  </div>
</div>
</div>

  ) : null
}

export default App
