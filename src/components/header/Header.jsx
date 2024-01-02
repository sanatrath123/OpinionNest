import React from "react";
import { Container } from "../index";
import LogoutBtn from "./LogoutBtn"
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";



function Header(){

  const  authStatus = useSelector((state)=> state.Auth.status)
  const Navigate = useNavigate()
 console.log("value of authstatus", authStatus)

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
        <header className='py-3 shadow bg-blue-600'>
          <Container>
            <nav className="flex">
         {/* add a logo */}
          <ul className="flex ml-auto">
 {
 NavItem.map((item)=>(
        item.active ? 
        <li key={item.Name}>
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
          </ul>
            </nav>
          </Container>
        </header>
    )
}


export default Header