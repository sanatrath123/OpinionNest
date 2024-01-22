import React,{useState ,useEffect} from 'react'
import service from '../appwrite/Config'
import {PostCard , Container} from '../components/index'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
      service.getPosts([]).then((posts) => {
          if (posts) {
            console.log(posts)
              setPosts(posts.documents)
          }
      })
  }, [])
  
  if (posts.length === 0) {
    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
}
console.log(posts)
  return (
    <div className='w-full py-8 mt-4 text-center'>
<Container>
<div className='flex flex-wrap'>
{posts.map((post)=>(
<div key={post.$id} className='w-1/4 p-1'>
<PostCard {...post} />
</div>
 
))}
</div>

</Container>
    </div>
  )
}

export default Home