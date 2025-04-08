import { useState } from "react"
import { Link , useNavigate } from "react-router-dom"
import {Input , Button } from "./index"
import {login as authlogin} from "../store/authslice"
import authAPI from "../backend/Auth"
import { useDispatch } from "react-redux"
import { useForm} from "react-hook-form"


function Login(){
  const {register , handleSubmit} = useForm()
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const [error , setError] = useState("")

// handelsubmit function 
const Login = async (data)=>{
    setError(null)
  try {
  const res = await authAPI.login(data)
  if(res.message){
    const userData = await authAPI.getCurrentUser()
    console.log(userData)
    dispatch(authlogin(userData))
    Navigate("/")
  }
  } catch (error) {
    setError(error.message)
  }



}


    return(
        <div className="w-full dark:bg-slate-800 dark:text-gray-100 bg-sky-300 shadow-2xl flex items-center justify-center">
             <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
 
 <Link to={`/Signup`}> <p>DONT HAVE AN ACCOUNT</p>  </Link>

 {error && <h2 className="text-red-600 text-center text-lg">{error}</h2>}
       
       <form onSubmit={handleSubmit(Login)} className="mt-8">
        <div className="space-y-5">
       <Input
        type="email"
        label="Email"
        placeholder="ENTER YOUR EMAIL"
        {...register("email", {
            required:true
        })}
        />
     
     <Input
        type="password"
        label="PASSWORD"
        placeholder="ENTER YOUR PASSWORD"
        {...register("password", {
            required: true
        })}
        />

<Button type="submit">LOGIN</Button>

       </div>
       </form>
        </div>
    )
}

export default Login;