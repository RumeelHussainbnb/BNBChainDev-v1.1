import Content from "../models/Content.js";  

async function calculatePositionNo(type) {

    var position = await Content.find({ContentType: type}, {Position: 1, _id: 0}).sort({Position: -1}).limit(1);
    var newPosition = 1

    if(position.length == 0){
        return newPosition
    }
    else{
        newPosition = position[0]["Position"] + 1
    }

    return parseInt(newPosition)
}
  
  export default calculatePositionNo