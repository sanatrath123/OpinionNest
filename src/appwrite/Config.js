import {Client, Databases, Storage , Query, ID} from "appwrite"
import conf from "../conf/conf"

class Service{
client = new Client
databases
bucket
constructor(){
    this.client.setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId)
this.databases = new Databases(this.client)
this.bucket = new Storage(this.client)   
}

//create post 
async createPost({title, content , featuredimg , status , slug , userid}){
    try {
        const result = await this.databases.createDocument(
            conf.appwtiteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredimg,
                status,
                userid,
            }
        )
        return result;
    } catch (error) {
       console.log("ERROR IN CREATE POST") 
    } 
}
//Delete posts
async deletePost({slug}){
    try {
        await this.databases.deleteDocument(
            conf.appwtiteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
        return true
    } catch (error) {
        console.log("ERROR IN DELETE POST")
    return false
    }

}
//read all post 
async getPost({slug}){
  try {
    return await this.databases.listDocument(
        conf.appwtiteDatabaseId,
        conf.appwriteCollectionId,
        slug
    )
  } catch (error) {
    console.log("ERROR IN GETPOST",error)
    return false
  }
    }

//readall post 
async getAllPost(quaries= Query.equal["status", "Active"]){
    try {
        return await this.databases.listDocuments(
            conf.appwtiteDatabaseId,
            conf.appwriteCollectionId,
            quaries
        )
    } catch (error) {
        console.log("ERROR IN ALL POSTS GET", error)
        return false
    }
}
//update post 
async updatePost(slug, {title, content, featuredImage, status}){
    try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,

            }
        )
    } catch (error) {
        console.log("Appwrite serive :: updatePost :: error", error);
    }
}

async uploadFile(file){
    try {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("Appwrite serive :: uploadFile :: error", error);
        return false
    }
}

async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        )
        return true
    } catch (error) {
        console.log("Appwrite serive :: deleteFile :: error", error);
        return false
    }
}

getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
    )
}


}

const service = new Service()
export default service;
