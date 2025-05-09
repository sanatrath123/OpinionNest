import React,{useState ,useEffect} from 'react'
import postAPI from '../backend/Config'
import {PostCard , Container} from '../components/index'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
      postAPI.getPosts([]).then((posts) => {
          if (posts) {
              setPosts(posts)
          }
      })
  }, [])

  
  if (posts?.length === 0) {
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
  return (
    <div className='w-full py-8 mt-4 text-center'>
<Container>
<div className='flex w-full flex-col items-center '>
{posts.map((post)=>(
<div key={post._id} className='lg:w-2/4 w-4/4  p-1'>
<PostCard {...post} />
</div>
 
))}
</div>
</Container>
    </div>
  )
}

export default Home