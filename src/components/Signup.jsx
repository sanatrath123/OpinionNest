import React from "react";
import authservice from "../appwrite/Auth";
import {login} from "../store/authslice"
import { useNavigate } from "react-router-dom";
import { Container,Input, Button } from "./index";
import { useState } from "react";
import { useDispatch } from "react-redux";


function Signup (){
const Navigate = useNavigate()
const dispatch = useDispatch()
const [name, setName]= useState("")
const [email, setEmail]= useState("")
const [password, setPassword]= useState("")

    function SignupHandeler (){
authservice.createAccount({name,email ,password})
   .then(()=>(dispatch(login())))
  
    }



    return(
        <></>
    )
}

export default Signup