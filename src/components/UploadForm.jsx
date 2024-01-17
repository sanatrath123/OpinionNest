import {useCallback, useEffect}from 'react'
import {Input , Button , RTE , Select} from '../components/index'
import {useForm} from 'react-hook-form'
import service from '../appwrite/Config'
import { useSelector } from 'react-redux'
import { useNavigate  } from 'react-router-dom'


function UploadForm({post}) {

  const userData = useSelector((state) => state.auth.userData);

console.log(userData)

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



const Submit = async (data)=>{
  console.log("data is ", data)
if(post){
  const file=data.image[0]? await service.uploadFile(data.image[0]) :undefined


 if(file){
  const fileId = file.$id
  await service.deleteFile(post.featuredimage)
  const dbpost = await service.updatePost(post.$id ,
    { ...data , featuredimage: file? fileId : undefined})
    if(dbpost){
 
      navigate(`/post/${dbpost.$id}`)
    }
 }

}
//if a new file is created
   else {
    const file = data.image[0] ? await service.uploadFile(data.image[0]) : undefined;
  
    if (file && file.$id) {
      console.log("file created", file);
  
      const fileId = file.$id;
      data.featuredimage = fileId;
      console.log(data)
      console.log(userData.$id)
      const dbpost = await service.createPost({...data ,userId: userData.$id});
  
      console.log("dbpost created", dbpost);
  
      if (dbpost && dbpost.$id) {
        navigate(`/post/${dbpost.$id}`);
      } 
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
 <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
 {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
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
