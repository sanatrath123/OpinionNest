import React , {useEffect, useState} from 'react'
import service from '../appwrite/Config'
import {PostCard , Container} from '../components/index'

function AllPost() {

  const [posts , setPosts] = useState()
  useEffect(()=>{},[])

service.getPosts([])
  .then((posts)=>{
    if(posts){
      setPosts(posts.documents)
    }
    else{
      null
    }
  })

  return (
   <div className='w-full p-8'>
<Container>
<div className='flex flex-wrap'>
{posts ? posts.map((post)=>(
 <div key={post.$id} className=' p-1 w-1/4'>
<PostCard {...post} />
 </div>
)) : <div>
  <h1 className='text-orange-700'>NO POST YET</h1></div>}
</div>
</Container>

   </div>
  )
}

export default AllPost