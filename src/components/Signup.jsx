
import authservice from "../appwrite/Auth";
import {login as authlogin} from "../store/authslice"
import { useNavigate , Link} from "react-router-dom";
import { Input, Button } from "./index";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {useForm } from "react-hook-form"

function Signup (){
const Navigate = useNavigate()
const dispatch = useDispatch()
const [error , setError] = useState()
const {register , handleSubmit} = useForm()


    const create = async (Data)=>{
          setError(null)

          try {
            const user = await authservice.createAccount(Data)
            if(user){
                const userData = await authservice.login(Data)
                if(userData){
                    const getuser = await authservice.getCurrentUser()
                    if(getuser){
                            dispatch(authlogin(userData))
                            Navigate("/")
                        }
                    
                }
            }

          } catch (error) {
            setError(error.message)
          }
    }



    return(
        <div className="w-full flex items-center justify-center shadow-xl">


               <div className=" mx-auto w-full max-w-lg bg-sky-300 rounded-xl p-10 border border-black/10 " >


               <h2>SIGNUP(CREATE AN ACCOUNT)</h2>


               <p className="mt-2 text-center text-base text-black/60">All Ready Have an Account 
               <Link to="/Login" className="font-medium text-primary transition-all duration-200 hover:underline">LOGIN</Link>
               </p>

               {error && <h2 className="text-bold text-center text-red-600">{error}</h2>}

         <form onSubmit={handleSubmit(create)}>
         <div className='space-y-5'>
          <Input
           label="Email"
          type="email"
          placeholder="ENTER YOUR EMAIL"
          {...register("email",
          {required: true})}
           />

          <Input
          label="Name"
          type="text"
          placeholder="ENTER YOUR NAME"
          {...register("text",
          {required: true})}
           />

          <Input
           label="Password"
          type="password"
          placeholder="ENTER YOUR PASSWORD"
          {...register("password",
          {required: true})}
           />

<Button type="submit" className="w-full">
                            Create Account
                        </Button>

</div>
           </form>

               </div>
        
        </div>
    )
}

export default Signup