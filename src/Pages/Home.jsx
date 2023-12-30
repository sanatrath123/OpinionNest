import React,{useState ,useEffect} from 'react'
import service from '../appwrite/Config'
import {PostCard , Container} from '../components/index'

function Home() {

  const [posts ,setPosts]= useState(null)
  
  useEffect(()=>{
    service.getAllPost([]).then((posts)=>{
      if(posts){
        setPosts(posts)
      }
    })
  },[])

  if(posts.length===0){
    return(
      <div className="w-full py-8 mt-4 text-center">
      <Container>
          <div className="flex flex-wrap">
              <div className="p-2 w-full">
                  <h1 className="text-2xl font-bold hover:text-gray-500">
                      YOU DONT HAVE ANY POSTS
                  </h1>
              </div>
          </div>
      </Container>
  </div>
    )
  }
  return (
    <div className='w-full py-8 mt-4 text-center'>
<Container>
<div className='flex flex-wrap'>
{posts.map((post)=>(
<div key={post.$id} className='w-1/4 p-1'>
<PostCard post={post} />
</div>
))}
</div>

</Container>
    </div>
  )
}

export default Home