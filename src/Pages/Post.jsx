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
import { BsBookmarksFill } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import { MdOutlineDeleteOutline } from "react-icons/md";


function Post() {
  const navigate = useNavigate();
  const UserData = useSelector((state) => state.auth.userData);
  const { id } = useParams();
  //const isAuthor = post && UserData ? UserData.$id === post.userId : false;
//create like this if author came we have some additional otion for update and delete



  const [post, setPost] = useState(null);
  const [cmnts , setCmnts] = useState(null)
  const [cmntSec , setCmntSec] = useState(false)
  const [activeImg , setActiveImg] = useState(0)
  const [newCmnt , setNewCmnt] = useState("")
  const [showDelCmntBtn , setShowDelCmntBtn] = useState(null)
  const GetPostData = async()=>{
    const data = await fetch(`${conf.serverUrl}/post/${id}`, {credentials:'include'})
    const json = await data.json()
    setPost(json) 
  }

  //get all the commnets
  const GetCmnts = async ()=>{
const data = await postAPI.GetComments(post?.commnetSec?._id)
setCmnts(data?.comments)
console.log(data?.comments)
  } 

  useEffect(()=>{
    if(!cmntSec) return
    GetCmnts()
  },[cmntSec])

  //add new commnet
  const AddNewCmnt = async()=>{
    const cmntId = post?.commnetSec?._id
    if(!cmntId || !newCmnt) return
     const data = await postAPI.PostNewCmnt(cmntId, newCmnt)
     setNewCmnt("")
     if(data)  GetCmnts() 
  }

  //delete the select comment
  const deletCmnt = async (cmntId)=>{
    if( !post?.commnetSec?._id) return
const data = await postAPI.DeleteCmnt(post?.commnetSec?._id,cmntId)
if(data) GetCmnts()
  }

  const handlePost_Like_Down_Save= async (action)=>{
    if(!post?._id && !action) return
    let userCliked 
    switch(action){
      case "like": userCliked = {userAction:"isLiked", totalAction:'totalLikes'}
      break
      case "downVote": userCliked = {userAction:"isDownvote", totalAction:'totalDownVote'}
      break
      case "save": userCliked = {userAction:"isSaved",totalAction:'totalSaved'}
      break
    }
    const rollBackPost = post
    setPost((prev)=>(
      {...prev ,[userCliked.userAction]:!prev?.[userCliked.userAction], 
        [userCliked.totalAction]:prev?.[userCliked.userAction] ? prev?.[userCliked.totalAction]-1 : prev?.[userCliked.totalAction]+1 }
    ))
const data =  await postAPI.updateLike_Down_Save_Post(post?._id,action)
if(!data) setPost(rollBackPost)
  }

useEffect(() => { GetPostData() },[]);

useEffect(()=>{console.log(post)},[post])

  return  (
<div className='w-full absolute shadow-lg left-0 right-0 top-3 bottom-0  z-[30]   backdrop-blur-sm rounded-xl mx-auto font-sans'>
<div className='lg:w-[70%] xl:w-[60%] w-11/12 shadow-md  flex flex-col gap-4 z-[30] mt-6  backdrop-blur-sm rounded-xl mx-auto pt-3 pb-5 md:px-6 px-2 bg-gray-900'>
<MdOutlineClose onClick={()=>navigate('/')} className='absolute cursor-pointer right-[-1.2rem] top-[-1.6rem]' color='white' size={30}/>
{/* username and profile */}
<div className='flex w-full justify-between '>
  <div className='flex items-center text-white'>
    <FaCircleUser size={35} color='black'/>
    <div className='px-2'>
      <h2 className='text-lg font-semibold text-violet-600'>{post?.userDetails?.name}</h2>
      <span className='text-sm'>{post?.createdAt.split("T")?.[0]}</span>
    </div>
  </div>
  <AiOutlineMenu className='cursor-pointer' size={30} color='white'/>
</div>

{/* title */}
<h2 className='text-xl font-[400] text-white font-roboto '>{post?.title}</h2>

<div className='w-full flex '>
  {/* post img and videos */}

  <div className={`${cmntSec ? "md:w-4/6 w-full" : "w-full"}`}>
  {post?.filesInfo?.length &&
    <div className=' relative flex justify-center text-white'>
      <IoMdArrowDropleftCircle onClick={()=>setActiveImg((prev)=>prev>=0 ? prev-1 : 0)} className='absolute left-4 top-1/2 -translate-y-1/2' size={35}/>
      <img src={`${conf.serverUrl}/post/file/${post?.filesInfo?.[activeImg]?._id}${post?.filesInfo?.[activeImg]?.extension}`} alt="image" className=' lg:h-96 w-[28rem]' />
      <IoMdArrowDroprightCircle onClick={()=>setActiveImg((prev)=>prev < post?.filesInfo?.length? prev+1 : post?.filesInfo?.length)}
       className='absolute right-4 top-1/2 -translate-y-1/2' size={35}/>
      </div>
  }
<h2 className='text-lg font-[300] text-white font-roboto mt-3 text-balance'>{post?.content}</h2>

  {/* like dislike save */}
  <div className='w-full  mt-6 px-3  flex md:justify-evenly justify-between items-center'>
<div className='flex gap-2 text-white items-center'>
<SlLike onClick={()=>handlePost_Like_Down_Save("like")} className='cursor-pointer' size={30} color={`${post?.isLiked ? "blue":"white"}`}/>
<span className='text-lg font-poppins hidden lg:block'>Like</span>
</div>
<div className='flex gap-2 text-white items-center'>
<SlDislike onClick={()=>handlePost_Like_Down_Save("downVote")} className='cursor-pointer' size={30} color={`${post?.isDownvote ? "blue":"white"}`}/>
<span className='text-lg font-poppins hidden lg:block'>DownVote</span>
</div>

<div className='flex gap-2 text-white items-center '>
<AiOutlineComment  className='cursor-pointer' size={30} color='white' onClick={()=>setCmntSec(!cmntSec)} />
<span className='text-lg font-poppins hidden lg:block'>Cmnts</span>
</div>

<div className='flex gap-2 text-white items-center'>
<BsBookmarksFill onClick={()=>handlePost_Like_Down_Save("save")} className='cursor-pointer' size={30} color={post?.isSaved ? 'blue': "white"}/>
<span className='text-lg font-poppins hidden lg:block'>Save</span>
</div>


</div>
  </div>
{/* comments sections */}
<div className={`lg:w-2/6  lg:relative absolute inset-2 max-h-[35rem] ${cmntSec ? 'flex':'hidden'} flex-col ml-2 bg-blue-100 rounded-xl font-poppins p-2  overflow-y-scroll`}>
<div className='w-full '>
  <h2 className='text-xl font-semibold border-b-2 border-black'>Comments</h2>
<button className='px-3 md:hidden absolute right-0 top-2  py-2 bg-violet-400 rounded-xl h-10'  onClick={()=>{setCmntSec(!cmntSec)}}>close</button>
</div>

{
cmnts?.length ?   cmnts?.map((cmnt)=>(
  <div key={cmnt?._id} className='mt-2 flex w-full items-start gap-2 pt-1 border-b-[1px] border-black '>
<img src="/pexels-hsapir-1054655.jpg" className='h-10 w-10 rounded-full' alt="" />
<div className=' font-[600] relative w-full'>
<h2 className='text-lg  font-[600]'>{cmnt?.userId?.name}</h2>
<h3 className='text-sm text-wrap  font-[500]'>{cmnt?.usercmt}</h3>
<div className='w-full flex items-center gap-4 px-2 my-1'>
<div className='flex flex-col items-center'><SlLike size={20} className='cursor-pointer' color='black'/>  <span className='text-sm font-normal'>{cmnt?.totalLikes ?cmnt?.totalLikes:null}</span></div>
<div className='flex flex-col items-center'><SlDislike size={20} className='cursor-pointer' color='black'/>  <span className='text-sm font-normal'>{cmnt?.totalDownVote ?cmnt?.totalDownVote:null }</span></div>
</div>
<MdOutlineDeleteOutline size={20} className={`absolute right-0 top-1 cursor-pointer  ${cmnt?.userId?._id==UserData.id ? "flex group-hover:opacity-100 opacity-0" :"hidden"}`} onClick={()=>deletCmnt(cmnt?._id)} />
</div>
</div>
)) : <h2 className='mt-3 mx-auto'>No commnets added </h2>
}



{/* isDisliked  isliked */}
<div className='absolute flex w-[95%] h-20 bottom-2 bg-gray-700 py-2 items-center text-white gap-3 text-wrap rounded-xl justify-start px-1 '>
<img src="/conor-mcgregor-quotes-1.jpg" className='h-7 w-7 rounded-full' alt="" />
<input type="text" placeholder='Post Your Comment' value={newCmnt} onChange={(e)=>{setNewCmnt(e.target.value)}} className='bg-transparent py-2 w-8/12' />
<IoSendSharp className='absolute right-1' size={20} onClick={AddNewCmnt}/>
</div>

</div>
{/* ends */}


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

