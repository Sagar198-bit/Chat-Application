import {Card} from "../components/ui/Card.jsx"
import {v4 as uuidv4} from "uuid";
import Avatar from "../../public/avatar.webp"

export const DashBoard = () => {

    const messagesCardData = [{
        id: uuidv4(), username: "Alex", status: "online", message: "Hello How are you", profile: Avatar

    }, {
        id: uuidv4(), username: "Hlex", status: "online", message: "Hello How are you", profile: Avatar

    }, {
        id: uuidv4(), username: "Nlex", status: "online", message: "Hello How are you", profile: Avatar

    }, {
        id: uuidv4(), username: "Jlex", status: "online", message: "Hello How are you", profile: Avatar

    }]

    return (<section className="h-screen bg-slate-100 p-4">
        <div className="h-full flex overflow-hidden rounded-3xl bg-white shadow-2xl">

            {/* Sidebar */}
            <div className="flex-[3] bg-white shadow-[4px_0_15px_rgba(0,0,0,0.05)]">
                <div className="h-16 px-5 flex items-center">
                    <h1 className="text-xl font-bold text-slate-800">
                        Messages
                    </h1>
                </div>

                <div className="p-3 space-y-2 overflow-y-auto h-[calc(100%-64px)]">
                    {messagesCardData.map((eachCardDetails) => (
                        <Card
                            key={eachCardDetails.id}
                            username={eachCardDetails.username}
                            status={eachCardDetails.status}
                            message={eachCardDetails.message}
                            profile={eachCardDetails.profile}
                        />
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-[7] flex flex-col bg-slate-50">

                {/* Header */}
                <div className="h-16 bg-white px-5 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                        <img
                            src={Avatar}
                            alt="profile"
                            className="w-11 h-11 rounded-full object-cover"
                        />

                        <div>
                            <h2 className="font-semibold text-slate-800">
                                Sagar
                            </h2>

                            <p className="text-sm text-green-500">
                                ● Online
                            </p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

                    {/* Receiver */}
                    <div className="flex">
                        <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm max-w-sm">
                            Hello bro 👋
                        </div>
                    </div>

                    {/* Sender */}
                    <div className="flex justify-end">
                        <div className="bg-[#1372c1] text-white px-4 py-3 rounded-2xl rounded-br-md shadow-sm max-w-sm">
                            Hi! How are you?
                        </div>
                    </div>

                    <div className="flex">
                        <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm max-w-sm">
                            I'm good. What about you?
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <div className="bg-[#1372c1] text-white px-4 py-3 rounded-2xl rounded-br-md shadow-sm max-w-sm">
                            Working on my MERN chat app 😎
                        </div>
                    </div>

                </div>

                {/* Input */}
                <div className="bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                    <div className="flex items-center gap-3">

                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 bg-slate-100 rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-[#1372c1]"
                        />

                        <button className="bg-[#1372c1] hover:bg-[#0f5ea0] text-white px-6 py-3 rounded-full font-medium transition-all">
                            Send
                        </button>

                    </div>
                </div>

            </div>
        </div>
    </section>);
};