import { Client, Account ,ID} from 'appwrite';
import conf from '../conf/conf'

class AuthService {
client=new Client()
account 

constructor(){
   this.client.setEndpoint(conf.appwriteUrl)
              .setProject(conf.appwriteProjectId)
    this.account = new Account(this.client)
}
//create sign up method inside the class 
async createAccount({email , password ,name}){
    try {
        const UserAccount = await this.account.create(ID.unique(), email , password , name)
        return UserAccount? this.login() :null
    } catch (error) {
        console.log("ERROR IN SIGNUP METHORD ",error)
    }
}

//create login methord 
async login({email , password}){
    try {
      return  await this.account.createEmailSession(email, password)
    } catch (error) {
        console.log("ERROR IN LOGIN METHORD",error)
    }
}

//create getcurrent user 
async getCurrentUser(){
try { 
    
   const User= await this.account.get()
   if(User){
    console.log(User)
    return User
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
        await this.account.deleteSessions();
    } catch (error) {
        console.log(" Error In Logout Service ", error);
    }
}

}

const authservice = new AuthService()
export default authservice;