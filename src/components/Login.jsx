import { useState } from "react"
import { Link , useNavigate } from "react-router-dom"
import {Input , Button } from "./index"
import {login as authlogin} from "../store/authslice"
import authservice from "../appwrite/Auth"
import { useDispatch } from "react-redux"
import { useForm} from "react-hook-form"


function Login(){
  const {register , handleSubmit} = useForm()
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const [error , setError] = useState("")

// handelsubmit function 
const login = async (data)=>{
    setError(null)
    console.log("start login")
  try {
    const session = await authservice.login(data)
    console.log(" data came from auth.js")
    if(session) {
        const userdata = await authservice.getCurrentUser()
        console.log(" user Logedin")
    if(userdata){
        dispatch(authlogin(userdata))
        Navigate("/")
        console.log(" login End")
    }
    }
  } catch (error) {
    setError(error.message)
  }



}


    return(
        <div className="w-full bg-sky-300 shadow-2xl flex items-center justify-center">
             <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
 
 <Link to={`/Singup`}> <p>DONT HAVE AN ACCOUNT</p>  </Link>

 {error && <h2 className="text-red-600 text-center text-lg">{error}</h2>}
       
       <form onSubmit={handleSubmit(login)} className="mt-8">
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