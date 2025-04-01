import { Link } from 'react-router-dom'
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import { SlLike, SlDislike } from "react-icons/sl";
import { AiOutlineComment } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsBookmarksFill } from "react-icons/bs";
import conf from '../conf/conf.js'
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux"

function PostCard(postData) {
  const photosNumber = [...Array(postData.filesInfo.length)].map((d,i)=>i)
const [activePic , setActivePic] = useState(0)
const {id,TotalLikes, TotalDownVote ,TotalSaves , createdAt,content ,title, likes,savedUsers ,downVote} = postData
const userData = useSelector((state)=>state.auth.userData)
const handlePicChange=(type)=>{
if(type=="next"){
 return photosNumber.length==activePic ? null :setActivePic(activePic+1)
}
return activePic==0 ? null :setActivePic(activePic-1)
}



  return (
    <div className="block mb-4 max-w-[500px] w-full overflow-hidden border pb-4 border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 dark:text-white transform hover:scale-105">
  
  <div className='flex w-full py-4 px-3 justify-between items-center'>
  <div className='flex gap-3'>
  <FaRegCircleUser size={25}/>
  <span className='font-semibold'>{ postData.author?.name || "USER"}</span>
  </div>
      <span>{createdAt.split("T")?.[0]}</span>
  </div>

<div className='relative text-black'>
{
    photosNumber.length>1 && <>{
      activePic > 0 && <IoMdArrowDropleftCircle onClick={()=>handlePicChange('prev')} size={35} className='absolute top-1/2 left-2' />
    }
    {
      activePic == 0 && <IoMdArrowDroprightCircle onClick={()=>handlePicChange('next')}  size={35} className='absolute top-1/2 right-2' />}</>
  }

    {postData?.filesInfo.length>0 && (
      postData?.filesInfo?.[activePic]?.extension == ".mp4" ?
      <video controls>
        <source src={`${conf.serverUrl}/post/file/${postData?.filesInfo?.[activePic]?._id}${postData?.filesInfo?.[activePic]?.extension}`} type="video/mp4" />
      </video>
      : <img  className="w-[95%] rounded-xl mx-auto h-48 object-cover" src={`${conf.serverUrl}/post/file/${postData?.filesInfo?.[activePic]?._id}${postData?.filesInfo?.[activePic]?.extension}`} alt={"null"} />
    )}
<div className='absolute bottom-3 right-1/2 flex gap-2 translate-x-1/2'>
  {
    photosNumber.length>1 && photosNumber.map((item,i)=><div key={i} className={` rounded-full     ${activePic==i ? "bg-gray-900 w-2 h-2" : "bg-gray-100 w-2 h-2"}`}></div>)
  }
</div>
</div>
      <div className="p-4 w-full">
        <h4 className="text-xl font-semibold mb-2 dark:text-white text-start">{title}</h4>
        <p className='dark:text-white  text-start'> 
        {content.length>50 && <span>{content.slice(0,50)} <span className='text-blue-500 cursor-pointer'>...ShowMore</span></span>  } 
        </p>
      </div>

  <div className='flex gap-7 px-4 my-2 w-full justify-center items-center  '>
<div className='relative'>
<SlLike size={25} color={`${likes?.includes(userData.id)  ? "white":"gray"}`} />
<span className=' absolute top-6 right-1/2 translate-x-1/2'>{TotalLikes}</span>
</div>
<div className='relative'>
<SlDislike size={25} color={`${downVote?.includes(userData.id)  ? "white":"gray"}`} />
<span className=' absolute top-6 right-1/2 translate-x-1/2'>{TotalDownVote}</span>
</div>
<div className='relative'>
<AiOutlineComment size={30} />
</div>
<div className='relative'>
<BsBookmarksFill size={25} color={`${savedUsers?.includes(userData.id)  ? "blue":"gray"}`} />
<span className=' absolute top-6 right-1/2 translate-x-1/2'>{TotalSaves}</span>
</div>

<button className='px-3 py-2 rounded-xl bg-sky-600'><Link to={`post/${id}`}>Read Full Blog</Link></button>

</div>


    </div>
  )
}

export default PostCard




