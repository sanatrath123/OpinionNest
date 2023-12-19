import { useId } from "react";
import { forwardRef } from "react"


const Input = forwardRef(function Input({
    type= "text",
    label ,
    className= "",
    ...props
}, ref)

{
    const Id = useId()
    return(
      <div className="w-full">
        {label && <label
        htmlFor= {Id}>
            {label}</label>
            }

   <input type={type}
    className={`shadow appearance-none border rounded w-full py-2 px-3 bg-rose-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
   {...props}
   ref = {ref}
   id = {Id}
   
   />
   </div>
    )
} )






export default Input;