
import {userModel} from "../model/AuthModel.js";
export const getALlUsers = async (req , res) => {
    try{
        const currentUserId =  req.user.userId
        // console.log('currentuserid: ' , currentUserId)
        const users = await userModel.find({
            _id: {
                $ne: currentUserId
            }
        }).select("-password");
        return res.status(201).json({
            status: true,
            data: users
        })
    }catch(error){
        return res.status(500).json({
            status: false,
            error: error
        })
    }
}