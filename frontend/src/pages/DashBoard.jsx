import {Card} from "../components/ui/Card.jsx"
import {v4 as uuidv4} from "uuid";
import Avatar from "../../public/avatar.webp"
import {useGetUsers} from "../hooks/useUsers.js";
import {useState} from "react";
import {useEffect} from "react";
import {ChatForm} from "../components/forms/chatform.jsx";
export const DashBoard = () => {

    const {data} = useGetUsers()
    const[user, setUser] = useState(null)


    return (<section className="h-screen bg-slate-100 p-4">
        <div className="h-full flex overflow-hidden rounded-3xl bg-white shadow-2xl">

            {/* Sidebar */}
            <div className="flex-[3] bg-white shadow-[4px_0_15px_rgba(0,0,0,0.05)]">
                <div className="h-16 px-5 flex items-center">
                    <h1 className="text-xl font-bold text-slate-800">
                        Messages
                    </h1>
                </div>

                <div className="p-3  flex-1 space-y-2 overflow-y-auto h-[calc(100%-64px)]">
                    {data?.map((eachCardDetails) => (
                        <Card
                            key={eachCardDetails._id}
                            id={eachCardDetails._id}
                            username={eachCardDetails.name}
                            status="online"
                            message="Hello How are you"
                            profile={Avatar}
                            handleUser={setUser}
                        />
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            {
                user && user !== null && <ChatForm user={user}/>
            }
        </div>
    </section>);
};