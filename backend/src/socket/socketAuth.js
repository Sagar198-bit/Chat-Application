import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();
const SocketAuth = (socket , next) => {
    try{
        const token = socket.handshake.auth.token
        if(!token){
            return next(new Error('Authentication Required'))
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        socket.userId = decoded.userId

        next()
    }catch(error){
        return next(new Error("Invalid Token"))
    }
}

export default SocketAuth