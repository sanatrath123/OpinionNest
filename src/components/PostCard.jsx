import React from "react";
import { Link } from "react-router-dom";
import authservices from "../appwrite/Config"

function PostCard ({$id , title , featuredimg}){
    return(
        <Link  to = {`/post/.${$id}`}>
            <div className="bg-pink-300 w-full rounded-xl p-4">
            <div className="w-full justify-center mb-4">
            <img src= {authservices.getFilePreview(featuredimg)} alt="title" className="rounded-xl" />
            </div>
            <h1 className="text-xl  font-bold ">{title}</h1>
            </div>
        </Link>
    )
}


export default PostCard;