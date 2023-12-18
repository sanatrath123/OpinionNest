import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/Auth"
import logout from "../../store/authslice"

function LogoutBtn (){
 const dispatch =useDispatch()

 const logouthandeler = () =>{
    authService.logout()
      .then(()=> {
        dispatch(logout())
    })
 }
    return(
       <button className="inline-bock px-6 py-2 duration-200 hover:bg-violet-500 rounded-full"
       onClick={logouthandeler}>
      LOGOUT
       </button>
    )
}

export default LogoutBtn