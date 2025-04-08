import React, { useEffect, useState } from 'react'
import postAPI from '../backend/Config'
import { useParams ,useNavigate } from 'react-router-dom'
import { Container ,UploadForm } from '../components/index'


function EditPost() {

  const [post , setPost]= useState('')
  const navigate = useNavigate()
  const {slug} = useParams()
  useEffect(()=>{
if(slug){
  postAPI.getPost({slug})
  .then((post)=>{
    if(post){
      setPost(post)
    }
  })
} else{
  navigate('/')
}
  },[slug , navigate])

  return post ? (
  <div className='py-8'>
  <Container>
    <UploadForm post={post} />
  </Container>
  </div>
  ) : null
}

export default EditPost