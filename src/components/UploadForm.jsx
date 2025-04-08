import {useCallback, useEffect}from 'react'
import {Input , Button , RTE , Select} from '../components/index'
import {useForm} from 'react-hook-form'
import postAPI from '../backend/Config'
import { useSelector } from 'react-redux'
import { useNavigate  } from 'react-router-dom'


function UploadForm({post}) {

  const userData = useSelector((state) => state.auth.userData);


  const navigate = useNavigate()
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
  defaultValues: 
  {
    title: post?.title || "",
    content: post?.content || "",
 file: post?.file || ""
  }
})



const Submit = async (data)=>{
 
if(post){
  console.log(post)
//   const file=data.image[0]? await postAPI.uploadFile(data.image[0]) :undefined
//  if(file){
//   const fileId = file.$id
  
//   const dbpost = await postAPI.updatePost(post.$id ,
//     { ...data , featuredimage: file? fileId : undefined})
//     if(dbpost)navigate(`/post/${dbpost.$id}`)
//     }
  }

   else {

      const response = await postAPI.createPost(data);
      if (response.message)navigate(`/`);
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
},[watch , setValue , slugTransform])


  return (
    
 <form onSubmit={handleSubmit(Submit)} className='flex flex-wrap bg-pink-100 dark:bg-slate-500'>
 <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
          
                <RTE className="dark:bg-slate-600 dark:text-gray-100" label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    multiple
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif , video/mp4"
                    {...register("files", { required: !post })}
                />
 {post && (
                    <div className="w-full mb-4">
                        <img
                            src={postAPI.getFilePreview(post.featuredimage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
          
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>

 </form>

    
  )

}

export default UploadForm
