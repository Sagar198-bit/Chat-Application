import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import cookie from 'cookie'
dotenv.config();
const SocketAuth = (socket , next) => {
    try{
        const cookies = cookie.parse(socket.handshake.auth.token || "")
        const token = cookies.token

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