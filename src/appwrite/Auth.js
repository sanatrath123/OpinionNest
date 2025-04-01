import conf from '../conf/conf'

const serverUrl = `${conf.serverUrl}/user`
class AuthAPI {
//create sign up method inside the class 
async createAccount({email , name , password}){
    try {
        const res = await fetch(`${serverUrl}/signup` , {method:"POST", body:JSON.stringify({email , name , password}) , headers:{"Content-Type":"application/json"}, credentials:'include'})
        const UserAccount = await res.json()
        return UserAccount
    } catch (error) {
        console.log("ERROR IN SIGNUP METHORD ",error)
    }
}

//create login methord 
async login({email , password}){
    try {
      const res = await fetch(`${serverUrl}/login` , {method:"POST", body:JSON.stringify({email, password}) , headers:{
        "Content-Type":"application/json"
      }, credentials:'include'})
      return await res.json()
    } catch (error) {
        console.log("ERROR IN LOGIN METHORD",error)
    }
}

//create getcurrent user 
async getCurrentUser(){
try { 
    
   const res= await fetch(`${serverUrl}/userdata`, {credentials:'include'})
   const user = await res.json()
   if(user){
    return user
   }
}
 catch (error) {
    console.log("ERROR IN GET CURRENT USER",error)
}
return null;
}

//logout 
async logout() {
    try {
        const res = await fetch(`${serverUrl}/logout`, {method:"POST", credentials:'include'})
     if(res.status==200) return true
    } catch (error) {
        console.log(" Error In Logout postAPI ", error);
    }
}

}

const authAPI = new AuthAPI()
export default authAPI;