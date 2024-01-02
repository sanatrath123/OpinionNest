import React ,{useCallback, useEffect}from 'react'
import {Input , Button , RTE , Select} from '../components/index'
import {useForm} from 'react-hook-form'
import service from '../appwrite/Config'
import { useSelector } from 'react-redux'
import { useNavigate  } from 'react-router-dom'


function UploadForm({post}) {

 const userData = useSelector((state)=>state.Auth.UserData)
  const navigate = useNavigate()
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
  defaultValues: 
  {
    title: post?.title || "",
    slug: post?.slug || "",
    content: post?.content || "",
    status: post?.status || "active"
  }
})



const Submit = async ({data})=>{
if(post){
  const file=data.image[0]? await service.uploadFile(data.image[0]) :undefined
const fileId = file.$id

 if(file){
  await service.deleteFile(post.featuredImage)
 }

 const dbpost = await service.updatePost(post.$id ,
 { ...data , featuredImage: file?fileId : undefined})
if(dbpost){
  navigate(`/post/${dbpost.$id}`)
}
}
//if a new file is created
   else{
   const file = data.image[0] ? await service.uploadFile(data.image[0]): undefined
  
  const fileId = file.$id
  data.featuredImage = fileId

   const dbpost = await service.updatePost({...data , userId: userData.$id})
if(dbpost){
  navigate(`/post/${dbpost.$id}`)
}
}
}

const slugTransform = useCallback((value) => {
  if (value && typeof value === "string")
      return value
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z\d\s]+/g, "-")
          .replace(/\s/g, "-");

  return "";
}, []);

useEffect(()=>{
  const subscription = watch((value ,{name})=>{
    if(name==="title"){
      setValue("slug",slugTransform(value.title) , { shouldValidate: true })
    }
    return () => subscription.unsubscribe();
  })
},[watch , setValue , slugTransform ])


  return (
    
 <form onSubmit={handleSubmit(Submit)} className='flex flex-wrap bg-pink-100'>
 <div className='w-2/3 bg-pink-200  m-1 p-1'>
<Input
label="TITLE"
className="bg-gray-400 mb-4"
placeholder="ENETR THE HEADING"
{...register("title", {required: true})}

/>

<Input
label="slug"
className="mb-4"
placeholder="url"
{...register("content",{required: true})}
onInput={(e)=>{
  setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
}}
/>

{/* <RTE label="Content" control={control} defaultValue={getValues('content')}/> */}
<RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
 </div>

 <div className='w-1/3'>
<Input 
type="image"
label="UPLOAD"
placeholder = "FILE"
accept="image/png, image/jpg, image/jpeg, image/gif"
{...register("image",{required: true})}
/>
{
  post && (
    <div className='w-full mb-4'>
  <img 
  src= {service.getFilePreview(post.featuredImage)}
  alt= {post.title}
  className="rounded-lg"
  />
</div>)
}

<Select
options={["active", "inactive"]}
label="Status"
className="mb-4"
{...register("status", { required: true })}
/>
<Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
{post ? "Update" : "Submit"}
</Button>



 </div>


 </form>

    
  )

}

export default UploadForm


