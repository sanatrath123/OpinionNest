import { useId } from "react";
import { forwardRef } from "react";


function Select ({
    options,
    className="",
    label,
    ...props

}, ref){
       
    const Id = useId()

return(
    <div className="w-full">
        {label && <label htmlFor={Id}>
            {label}
            </label>}

        <select {...props}
           id = {Id}
           ref= {ref}
           className={`px-2 py-3 rounded-lg bg-pink-200 text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full
           ${className}`}>
       {
        options?.map((option)=>(
           <option key={option} value={option}>
            {option}
           </option>
        ))
       }
        </select>
    </div>
)
}


export default forwardRef(Select);

