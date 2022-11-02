import mongoose from 'mongoose';

// models
import User from '../models/User.js';

import jwt from "jsonwebtoken"
const KEY = "ghjsgdagfzdugfdhfljdshfidsufsd";
mongoose.set('useFindAndModify', false);

export default {
    onFindOneAndUpdateUser: async (req, res) => {
        try{
            const data = JSON.parse(JSON.stringify(req.body));
            const username = data.Username
    
            const token = jwt.sign({
              "Username": username, "CreatedAt": new Date()
            }, KEY)
    
            const user = await User.findOneAndUpdate({Username: data.Username, Password: data.Password}, { "Token" : "Token " + token, "TokenUpdatedAt": new Date()}, {new:true});
           
            res.status(201).json({Token: user["Token"]})
        }catch(error){
            res.status(400).json({success: false, error: error});
        }
    }
}