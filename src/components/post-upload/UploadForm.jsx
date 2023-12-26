import React, { useEffect } from 'react'
import { useCallback } from 'react'
import services from "../../appwrite/Config"
import { useSelector } from 'react-redux'
import {Button , Input , RTE, Select} from "../index"
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'


function UploadForm({post}) {
    const [register , handelSubmit , watch , cotrol , setValue , getValues ] = useForm({
        defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active"

        }
    })

    const Navigate = useNavigate()
 const userData = useSelector((state)=> state.Auth.userData)

const submit = async (data)=>
{
if(post){
    const file = data.image[0] ? await services.uploadFile(data.image[0]) : null
    if(file){
        await services.deleteFile(post.featuredImage)
    }
    const dbpost = await services.updatePost(post.$id ,{
        ...data,
        featuredImage : file ? file.$id : undefined
})
if(dbpost){
    Navigate(`/post/${dbpost.$id}`)
}
} else {
    const file = data.image[0] ? await services.uploadFile(data.image[0]) : null
    const fileId = file.$id
     data.featuredImage = fileId
     
 
     const dbpost = await services.createPost({...data, userid:userData.$id})
     if(dbpost){
        Navigate(`/post/${dbpost.$id}`)
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

React.useEffect(() => {
    const subscription = watch((value, { name }) => {
        if (name === "title") {
            setValue("slug", slugTransform(value.title), { shouldValidate: true });
        }
    });


    return () => subscription.unsubscribe();
},[watch , setValue , slugTransform])



return (
    <form onSubmit={handelSubmit(submit)} className='flex flex-wrap'>
 <div className='w-2/3 bg-pink-100 px-2'>

<Input
label="title"
placeholder ="WRITE YOUR TITLE"
className="p-2 mb-4 text-blue-500"
{...register( "title",{reqired:true})}
/>

<Input
label="slug"
placeholder="slug"
className="mb-4"
{...register("slug",{ reqired:true})}

onInput={(e)=>{
setValue("slug" , slugTransform(e.currentTarget.value), {shouldValidate:true})
}}
/>

<RTE name="content" control={cotrol} label="Content:" defaultvalue={getValues("content")} />

 </div>

 <div className='w-1/3  bg-pink-200 px-2'>
    <Input
    type="file"
    label="UPLOAD IMAGE"
    placeholder= "UPLOAD FILE" 
    className="mb-4"
    accept="image/png, image/jpg, image/jpeg, image/gif"
    {...register("image", {required: !post})}
    />
 

 {post && (
                    <div className="w-full mb-4">
                        <img
                            src={services.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                options={["active", "inactive"]}
                className="mb-4"
                label="STATUS"
                {...register("status",{reqired: true})} />

<Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>

 </div>


    </form>
  )
}




 

export default UploadForm