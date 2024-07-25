import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/Auth"
import {logout} from "../../store/authslice"
import Button from "../Button"

function LogoutBtn (){
 const dispatch =useDispatch()

 const logouthandeler = () =>{
   console.log("Enter logout handeler")
   const value = authService.logout()
   console.log("session going on")
     if(value){
     dispatch(logout())
     }
 }
    return(
 <Button className="inline-bock px-6 py-2 duration-200 hover:bg-violet-500 rounded-full"
 onClick={logouthandeler}>
 
   Logout
 </Button>

    )

}

export default LogoutBtn