import conf from '../conf/conf.js';


const serverurl = `${conf.serverUrl}/post`
export class PostAPI{
 
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

}

const postAPI = new PostAPI()
export default postAPI
 
 
