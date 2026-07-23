import {Card} from "../components/ui/Card.jsx"
import Avatar from "../../public/avatar.webp"
import {useGetUsers} from "../hooks/useUsers.js";
import {useEffect, useState} from "react";
import {Socket} from "../socket/socket.js"
import {useSelector} from "react-redux";
import {ChatForm} from "../components/forms/chatform.jsx";

export const DashBoard = () => {

    const {data} = useGetUsers()
    const [user, setUser] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const {data: authData} = useSelector((state) => state.Auth)
    const socket = Socket(authData?.name, authData?._id)

    useEffect(() => {
        const handleUsers = (userIds) => {
            setOnlineUsers(userIds)
        }

        socket.on('onlineUsers', handleUsers)

        return () => {
            socket.off('onlineUsers', handleUsers)
        }
    }, []);

    const handleUser = () => {
        setUser(null)
    }

    return (<section className="h-screen bg-slate-100 p-0 sm:p-4">
        <div className="h-full flex overflow-hidden rounded-none sm:rounded-3xl bg-white shadow-2xl">

            {/* Sidebar */}
            <div className={`${user ? "hidden md:block" : "block"} w-full md:w-auto md:flex-[3] bg-white shadow-[4px_0_15px_rgba(0,0,0,0.05)]`}>
                <div className="h-16 px-5 flex items-center">
                    <h1 className="text-xl font-bold text-slate-800">
                        Messages
                    </h1>
                </div>

                <div className="p-3 space-y-2 overflow-y-auto h-[calc(100%-64px)]">
                    {data?.map((eachCardDetails) => (
                        <Card
                            key={eachCardDetails._id}
                            id={eachCardDetails._id}
                            username={eachCardDetails.name}
                            profile={Avatar}
                            handleUser={setUser}
                            messages="Hello 😊"
                            status={onlineUsers?.includes(eachCardDetails._id) ? "online" : "offline"}
                        />
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`${user ? "flex" : "hidden md:flex"} w-full md:flex-[7] flex-col`}>
                {user ? (
                    <ChatForm user={user} status={onlineUsers} handleUser={handleUser}/>
                ) : (
                    <div className="flex-1 hidden md:flex items-center justify-center text-slate-400">
                        Select a chat to start messaging
                    </div>
                )}
            </div>
        </div>
    </section>);
};