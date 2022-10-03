// models
import User from "../models/User.js";

export default {
    onGetUser: async (req, res) => {
        try{
            const user = await User.findOne({"PublicKey": req.params.publicKey});
            
            res.status(200).json(user)
        } catch(error){
            res.status(400).json({success: false});
        } 
    },
    
}