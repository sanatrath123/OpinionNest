import React , {useEffect, useState} from 'react'
import service from '../appwrite/Config'
import {PostCard , Container} from '../components/index'

function AllPost() {

  const [posts , setPosts] = useState(null)
  useEffect(()=>{},[])

service.getAllPost([])
  .then((posts)=>{
    if(posts){
      setPosts(posts)
    }
    else{
      null
    }
  })

  return (
   <div className='w-full p-8'>
<Container>
<div className='flex flex-wrap'>
{posts.map((post)=>(
 <div key={post.$id} className=' p-1 w-1/4'>
<PostCard post={post} />
 </div>
))}
</div>
</Container>

   </div>
  )
}

export default AllPost