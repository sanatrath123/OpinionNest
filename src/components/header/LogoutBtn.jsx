
import { useDispatch } from "react-redux";
import authAPI from "../../backend/Auth"
import {logout} from "../../store/authslice"
import Button from "../Button"

function LogoutBtn (){
 const dispatch =useDispatch()

 const logouthandeler = async () =>{
   console.log("Enter logout handeler")
   const value =await authAPI.logout()

     dispatch(logout())

 }
    return(
 <Button className="inline-bock px-6 py-2 duration-200 hover:bg-violet-500 rounded-full"
 onClick={logouthandeler}>
 
   Logout
 </Button>

    )

}

export default LogoutBtn