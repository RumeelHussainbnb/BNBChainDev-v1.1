import User from "../models/User.js";

async function validateToken(token){
        
    if(typeof token === 'undefined'){
        return false
    }

    try{
        const user = User.find({ "Token" : token})

        if(typeof user !== 'undefined'){
            return true
        }
        else{
            return false
        }

    }catch(error){
        console.log("Something bad happend while validating the Token ", error);
    }
}


export default validateToken;