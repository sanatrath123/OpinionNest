import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Container } from '../components/index';
import  postAPI  from '../backend/Config.js';
import conf from '../conf/conf';
import { MdOutlineClose } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import { SlLike, SlDislike } from "react-icons/sl";
import { AiOutlineComment } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsBookmarksFill } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";

function Post() {
  const navigate = useNavigate();
  const UserData = useSelector((state) => state.auth.userData);
  const { id } = useParams();
  
  //const isAuthor = post && UserData ? UserData.$id === post.userId : false;
//create like this if author came we have some additional otion for update and delete


const [cmntSec , setCmntSec] = useState(false)

  const a = Array.from({length:10}).map((u,i)=>i)

  const [post, setPost] = useState(null);
  const [cmnts , setCmnts] = useState(null)
  const GetPostData = async()=>{
    const data = await fetch(`${conf.serverUrl}/post/${id}`, {credentials:'include'})
    const json = await data.json()
    setPost(json) 
   if(json?.commentSection?.id) GetCmnts(json.commentSection.id)
  }

  const GetCmnts = async (cmntsecid)=>{
    if(!cmntsecid) return 
const data = await fetch(`${conf.serverUrl}/cmt/${cmntsecid}`, {credentials:'include'})
const json = await data.json()
setCmnts(json?.comments)
  } 

useEffect(() => { GetPostData() },[]);
useEffect(() => { console.log(cmnts) },[cmnts]);


  return  (
<div className='w-full absolute shadow-lg left-0 right-0 top-3 bottom-0  z-[30]   backdrop-blur-sm rounded-xl mx-auto font-sans'>
<div className='lg:w-[70%] w-11/12 shadow-md  flex flex-col gap-4 z-[30] mt-6  backdrop-blur-sm rounded-xl mx-auto pt-3 pb-5 md:px-6 px-2 bg-gray-900'>
<MdOutlineClose className='absolute cursor-pointer right-[-1.2rem] top-[-1.6rem]' color='white' size={30}/>
{/* username and profile */}
<div className='flex w-full justify-between '>
  <div className='flex items-center text-white'>
    <FaCircleUser size={35} color='black'/>
    <div className='px-2'>
      <h2 className='text-lg font-semibold text-violet-600'>Sanat Kumar</h2>
      <span className='text-sm'>2025-04-09</span>
    </div>
  </div>
  <AiOutlineMenu className='cursor-pointer' size={30} color='white'/>
</div>

{/* title */}
<h2 className='text-xl font-[400] text-white font-roboto '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, sint. Lorem ipsum dolor sit</h2>

<div className='w-full flex '>
  {/* post img and videos */}

  <div className='md:w-4/6 w-full '>
  <img src="/conor-mcgregor-quotes-1.jpg" alt="image" className='w-full ' />

<h2 className='text-lg font-[300] text-white font-roboto mt-3 text-balance'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi exercitationem sequi facere quibusdam excepturi praesentium voluptates voluptatum similique fugiat! Nulla aut velit enim rerum ipsa maiores excepturi quia in accusantium alias? Culpa, autem quia. Ratione dolorem molestiae consectetur alias voluptatibus deleniti, tempore doloremque nam commodi blanditiis eveniet voluptatem maiores delectus.</h2>

  {/* like dislike save */}
  <div className='w-full  mt-6 px-3  flex md:justify-evenly justify-between items-center'>
<div className='flex gap-2 text-white items-center'>
<SlLike size={30} color='white'/>
<span className='text-lg font-poppins hidden lg:block'>Like</span>
</div>
<div className='flex gap-2 text-white items-center'>
<SlDislike size={30} color='white'/>
<span className='text-lg font-poppins hidden lg:block'>DownVote</span>
</div>

<div className='flex gap-2 text-white items-center'>
<AiOutlineComment size={30} color='white' onClick={()=>setCmntSec(!cmntSec)} />
<span className='text-lg font-poppins hidden lg:block'>Cmnts</span>
</div>

<div className='flex gap-2 text-white items-center'>
<BsBookmarksFill size={30} color='white'/>
<span className='text-lg font-poppins hidden lg:block'>Save</span>
</div>


</div>
  </div>
{/* comments sections */}
<div className={`lg:w-2/6 lg:relative absolute inset-2 max-h-[35rem]  md:flex ${cmntSec ? 'flex':'hidden'} flex-col ml-2 bg-blue-100 rounded-xl font-poppins p-2 flex overflow-y-scroll`}>
<div className='w-full'>
  <h2 className='text-xl font-semibold border-b-2 border-black'>Comments</h2>
<button className='px-3 md:hidden absolute right-0 top-2  py-2 bg-violet-400 rounded-xl h-10'  onClick={()=>{setCmntSec(!cmntSec)}}>close</button>
</div>

{
  cmnts?.map((i)=>(
    <div key={i} className='mt-2 flex w-full items-start gap-2 pt-1 border-b-[1px] border-black '>
<img src="/pexels-hsapir-1054655.jpg" className='h-10 w-10 rounded-full' alt="" />
<div className=' font-[600]'>
<h2 className='text-lg  font-[600]'>Yes_boss</h2>
<h3 className='text-sm text-wrap  font-[500]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, earum!</h3>
<div className='w-full flex items-center gap-4 px-2 my-1'>
<div className='flex flex-col items-center'><SlLike size={20} className='cursor-pointer' color='black'/>  <span className='text-sm font-normal'>10</span></div>
<div className='flex flex-col items-center'><SlDislike size={20} className='cursor-pointer' color='black'/>  <span className='text-sm font-normal'>4</span></div>
</div>
</div>
</div>
  ))
}

<div className='sticky flex w-full h-20 bottom-2 bg-gray-700 py-2 items-center text-white gap-3 text-wrap rounded-xl justify-between px-1'>
<img src="/conor-mcgregor-quotes-1.jpg" className='h-7 w-7 rounded-full' alt="" />
<input type="text" placeholder='Post Your Comment' className='bg-transparent py-2' />
<IoSendSharp/>
</div>

</div>
</div>



 </div>
</div>
  ) 
}

export default Post;




{/* <img 
src={`${conf.serverUrl}/post/file/${post?.filesInfo?.[0]._id}${post?.filesInfo?.[0].extension}`}
alt={post.title}
className='rounded-xl w-[40%] h-[200px]'
/> 

<video controls width={320} height={240}>
<source src={`${postAPI.getFileView(post?.featuredimage)}&mode=admin`} type="video/mp4"></source>
</video> */}


// const DeletePost = async () => {
//   console.log(post);

//   try {
//     await postAPI.deleteFile(post.$id);
//   } catch (error) {
//     console.error('Error deleting post or file', error);
//   }
// };

