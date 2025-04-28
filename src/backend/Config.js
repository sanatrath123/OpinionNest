import { json } from 'react-router-dom';
import conf from '../conf/conf.js';
import { stringify } from 'postcss';


const serverurl = `${conf.serverUrl}/post`
 class PostAPI{
 
    async createPost(data){
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("content", data.content)
        Array.from(data?.files).forEach((item)=>{
            formData.append("files",item)
        })
    
        try {
            const data = await fetch(serverurl, {
                method:'POST' , body:formData, credentials:'include'
            })
            return await data.json()
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
            throw error;
        }
    }

//get all posts
    async getPosts(){
        try {
           const data = await fetch(serverurl, { method:"GET", credentials:'include'})
           return await data.json()
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

//get post by id
async getPost(postId){
    try {
       const data = await fetch(`${serverurl}/${postId}`,{credentials:'include'})
       return await data.json()
    } catch (error) {
        console.log("Appwrite serive :: getPost :: error", error);
        return false
    }
}

//delete post
async deletePost(postId){
    try {
     const data= await fetch(`${serverurl}/${postId}`, {
            method:"DELETE",credentials:'include'
        })
        return await data.json()
    } catch (error) {
        console.log("Appwrite serive :: deletePost :: error", error);
    }
}

//update only title and content
async updatePost(postId, {title, content}){
        try {
            const data = await fetch(`${serverurl}/${postId}`, {
                method:"PATCH", body:JSON.stringify({title, content}) ,credentials:'include'
            })
            return await data.json()
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async updateLike_Down_Save_Post (postId , action){
try {
    const data = await fetch(`${serverurl}/${postId}/${action}`, {
        method:"PUT", credentials:'include'
    })
    return data.status==200 ? true :false 
} catch (error) {
    console.log("error while like and downvote the post", error)
}
    }

async GetComments(cmntsecid){
     try {
        if(!cmntsecid) return 
        const data = await fetch(`${conf.serverUrl}/cmt/${cmntsecid}`, {credentials:'include'})
        const json = await data.json()
        console.log(json)
        return json
     } catch (error) {
        console.log("error while getting the comments", error)
     }
}

async PostNewCmnt(cmntsecid, comment ){
try {
    const data = await fetch(`${conf.serverUrl}/cmt/${cmntsecid}`, {
        method:"POST", credentials:'include',  body:JSON.stringify({comment}), headers:{
            'content-type': 'application/json'
        }
    })
    console.log(data)
   return data?.status==201 ? true :false
} catch (error) {
    console.log("error while adding a new cmnt", error)
}
}

async DeleteCmnt(cmntsecid, delcmntId){
    try {
        const data = await fetch(`${conf.serverUrl}/cmt/${cmntsecid}`, {
            method:"DELETE", credentials:'include' , body:JSON.stringify({delcmntId}),headers:{
                'content-type' : 'application/json'
            }
        }) 
     return   data.status == 200 ? true :false
    } catch (error) {
        console.log("error while delete a cmnt", error)
    }
}


}

const postAPI = new PostAPI()
export default postAPI
 
 
