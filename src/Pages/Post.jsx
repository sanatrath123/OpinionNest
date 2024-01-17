import  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link , useNavigate } from 'react-router-dom'
import {Button , Container }from '../components/index'
import parse from "html-react-parser";
import service from '../appwrite/Config';

function Post() {
 const [post , setPost]= useState(null)
 const navigate = useNavigate()
 const UserData = useSelector((state)=>state.auth.userData)
 const {slug}= useParams()

const isAuthor = post && UserData ? UserData.$id === post.userId  : false

 useEffect(()=>{
if(slug){
  service.getPost({slug})
          .then((post)=>{
            if(post){
              setPost(post)
              console.log(post)
            }
          })
} else {
  navigate("/")
}
 },[slug ,navigate])

 const DeletePost = (fileids)=>{
  service.deleteFile(fileids)
        .then((status)=>{
          if(status){
            service.deleteFile(post.featuredImage)
          navigate("/")
          }
        })
 }


  return post ? 
  (
    <div className='py-8'>
<Container>
<div className='"w-full flex justify-center mb-4 relative border rounded-xl p-2'>
<img src= {service.getFilePreview(post.featuredimage)}
 alt={post.title}
 className='rounded-xl' />

{ isAuthor && (
  <div className='absolute right-6 top-6'>
    <Link to={`/Edit-Post/${post.$id}`}>
    <Button className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
       EDIT
  </Button>
    </Link>

    <Button onClick={()=>{const fileids = post.$id
    DeletePost(fileids)}} className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'> Delete</Button>
  </div>
)}

<div className='w-full mb-6'>
<h3 className='text-2xl font-bold'>{post.title}</h3>
</div>

<div className='browser-css'>
{parse(post.content)}
</div>

</div>

</Container>

    </div>
  )


  :null
}

export default Post