
import { Container } from "../index";
import LogoutBtn from "./LogoutBtn"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Darkmode from "./Darkmode";


function Header(){

  const  authStatus = useSelector((state)=> state.auth.status)
  const Navigate = useNavigate()
 

const NavItem = [
    {
       Name: "Home",
       slug: "/",
       active: authStatus

    },

    {
        Name: "Addpost",
        slug: '/Addpost',
        active: authStatus
    },
    {
        Name:"Allpost",
        slug: "/Allpost",
        active: authStatus
    },

    {
        Name: "LOGIN",
        slug: "/Login",
        active: !authStatus
    },

    {
        Name: "SIGNUP",
        slug: "/Signup",
        active: !authStatus
    }
]


    return(
        <header className='py-3 shadow dark:bg-slate-700 bg-blue-600 text-xl font-semibold'>
          <Container>
            <nav className="flex">
         {/* add a logo */}
          <ul className="flex ml-auto">
 {
 NavItem.map((item)=>(
        item.active ? 
        <li key={item.Name} className="dark:text-gray-100">
        <button className="inline-bock px-6 py-2 duration-200 hover:bg-violet-500 rounded-full"
        onClick={()=>Navigate(item.slug)}>
            {item.Name}
        </button> 
        </li>: null
    ))
}
  {authStatus && <li>
    <LogoutBtn/>
    </li>}

    <li className="ml-3"><Darkmode/></li>
          </ul>
            </nav>
          </Container>
        </header>
    )
}


export default Header