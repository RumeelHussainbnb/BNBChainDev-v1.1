// models
import Content from '../models/Content.js';


export default {
  onGetAllAdmins: async (req, res) => {
    try{
        const contents = await Content.find({ContentStatus: req.query.type}).sort({Position: 1});
        res.status(200).json({success:true , data:contents})
    } catch(error){
        res.status(400).json({success: false});
    }
  },

}