
import { useEffect , useState} from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"



function Protected ({children , authentication= true}){
   
const Navigate = useNavigate()
const [loader , setLoader] = useState(true)
const authStatus = useSelector(state=>state.Auth.status)




useEffect(()=>{

if(authentication && authStatus !== authentication){
    Navigate("/login")
} else if( !authentication  && authStatus !== authentication){
    Navigate("/")
}
setLoader(false)
}, [authStatus , authentication , Navigate])


    return loader ? <h1 className="text-color-red-600">...LOADING</h1> : <>{children}</>
}

export default Protected