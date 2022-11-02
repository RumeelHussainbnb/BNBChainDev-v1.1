import User from "../models/User.js";

async function validateKey(key){
        
    if(typeof key === 'undefined'){
        return false
    }

    try{
        const user = await User.findOne({ PublicKey : key})

        if(typeof user !== 'undefined' && user.Role === "admin"){
            return true
        }
        else{
            return false
        }

    }catch(error){
        console.log("Something bad happend while validating the key ", error);
    }
}


export default validateKey;