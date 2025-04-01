import { Link } from 'react-router-dom'
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import { SlLike, SlDislike } from "react-icons/sl";
import { AiOutlineComment } from "react-icons/ai";
import conf from '../conf/conf.js'
import { useEffect, useState } from 'react';

function PostCard(postData) {
  const photosNumber = [...Array(postData.filesInfo.length)].map((d,i)=>i)
const [activePic , setActivePic] = useState(0)

const handlePicChange=(type)=>{
if(type=="next"){
 return photosNumber.length==activePic ? null :setActivePic(activePic+1)
}
return activePic==0 ? null :setActivePic(activePic-1)
}



  return (
    <div className="block mb-4 max-w-[500px] w-full overflow-hidden border pb-4 border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-105">
<div className='relative'>
{
    photosNumber.length>1 && <>{
      activePic > 0 && <IoMdArrowDropleftCircle onClick={()=>handlePicChange('prev')} size={35} className='absolute top-1/2 left-2' />
    }
    {
      activePic == 0 && <IoMdArrowDroprightCircle onClick={()=>handlePicChange('next')}  size={35} className='absolute top-1/2 right-2' />}</>
  }

    {postData?.filesInfo.length && (
      postData?.filesInfo?.[activePic]?.extension == ".mp4" ?
      <video controls>
        <source src={`${conf.serverUrl}/post/file/${postData?.filesInfo?.[activePic]?._id}${postData?.filesInfo?.[activePic]?.extension}`} type="video/mp4" />
      </video>
      : <img  className="w-full h-48 object-cover" src={`${conf.serverUrl}/post/file/${postData?.filesInfo?.[activePic]?._id}${postData?.filesInfo?.[activePic]?.extension}`} alt={"null"} />
    )}
<div className='absolute bottom-3 right-1/2 flex gap-2 translate-x-1/2'>
  {
    photosNumber.length>1 && photosNumber.map((item,i)=><div key={i} className='w-2 h-2 rounded-full  bg-sky-100'></div>)
  }
</div>
</div>

      <div className="p-4">
        <h4 className="text-xl font-bold mb-2 dark:text-white">{postData?.title}</h4>
        <span className='dark:text-white'>{postData?.content}</span>
      </div>

  <div className='flex gap-7 px-4 my-2 w-full justify-center items-center  '>
<div className='relative'>
<SlLike size={25} className='' />
<span className=' absolute top-6 right-1/2 translate-x-1/2'>12</span>
</div>
<div className='relative'>
<SlDislike size={25} />
<span className=' absolute top-6 right-1/2 translate-x-1/2'>12</span>
</div>
<div className='relative'>
<AiOutlineComment size={30} />
<span className=' absolute top-6 right-1/2 translate-x-1/2'>12</span>
</div>

<button className='px-3 py-2 rounded-xl bg-sky-600'>Read More</button>

</div>
    </div>
  )
}

export default PostCard




