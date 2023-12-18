import React from "react";
import { Container } from "../Container";
import LogoutBtn from "./LogoutBtn"
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



function Header(){

  const  authStatus = useSelector((state)=> state.auth.status)
  const navigate = useNavigate()


const NavItem = [
    {
       Name: "Home",
       slug: "/",
       active: authStatus

    },

    {
        Name: "ADDPOST",
        slug: '/AddPost',
        active: authStatus
    },
    {
        Name:"POST",
        slug: "/Post",
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
        <header className='py-3 shadow bg-blue-600'>
          <Container>
            <nav className="flex">
            <div className='mr-4'>
            <Link to='/'>
                {/* FIX THE LOGO */}
       {/* <img src="images.png" alt="LOGO" height={100px} /> */}
              </Link>
          </div>
          <ul className="flex ml-auto">
 {
 NavItem.map((item)=>{
        item.active ? 
        <li key={item.Name}>
        <button className="inline-bock px-6 py-2 duration-200 hover:bg-violet-500 rounded-full"
        onClick={()=>navigate(item.slug)}>
            {item.Name}
        </button> 
        </li>: null
    })
}
  {authStatus && <li>
    <LogoutBtn/>
    </li>}
          </ul>
            </nav>
          </Container>
        </header>
    )
}


export default Header