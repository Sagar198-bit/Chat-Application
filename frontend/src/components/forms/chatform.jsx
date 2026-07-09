import Avatar from "../../../public/avatar.webp";
import {useSelector} from "react-redux";
import {useState , useEffect} from "react";
import {Socket} from "../../socket/socket.js" // adjust to your actual socket instance path

export const ChatForm = ({user}) => {
    const {id: receiverId, username} = user
    const {data} = useSelector((state) => state.Auth)
    console.log('Senderid: ' , data)// data = currently logged-in user
    const currentUserId = data?.data?._id

    const [textInput, setTextInput] = useState("")
    const [messages, setMessages] = useState([])

    const handleChange = (event) => {
        setTextInput(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const trimmed = textInput.trim()
        if (trimmed.length === 0) return

        const newMessage = {
            id: crypto.randomUUID(),
            text: trimmed,
            senderId: currentUserId,
            receiverId: receiverId,
            timestamp: Date.now(),
        }

        // show it in my own chat immediately
        setMessages((prev) => [...prev, newMessage])


        console.log(newMessage)
        // send it to the server to forward to the other user
        Socket().emit("sendMessage", newMessage)

        setTextInput("")
    }
    useEffect(() => {
        const handleIncoming = (message) => {

            console.log("Received:", message);

            setMessages((prev) => [...prev, message]);
        };

        Socket().on("receiveMessage", handleIncoming);

        return () => {
            Socket().off("receiveMessage", handleIncoming);
        };
    }, []);


    return (<div className="flex flex-col flex-1 bg-slate-50">

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
                            {username}
                        </h2>

                        <p className="text-sm text-green-500">
                            ● Online
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                {messages.map((message) => {
                    const isMine = message.senderId === currentUserId
                    return (<div key={message.id} className={isMine ? "flex justify-end" : "flex justify-start"}>
                            <div
                                className={isMine ? "bg-[#1372c1] text-white px-4 py-3 rounded-2xl rounded-br-md shadow-sm max-w-sm" : "bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm max-w-sm"}
                            >
                                {message.text}
                            </div>
                        </div>)
                })}
            </div>

            {/* Input */}
            <div className="bg-white p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                <div className="flex items-center gap-3">

                    <input
                        type="text"
                        value={textInput}
                        onChange={handleChange}
                        placeholder="Type a message..."
                        className="flex-1 bg-slate-100 rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-[#1372c1]"
                    />

                    <button
                        onClick={handleSubmit}
                        className="bg-[#1372c1] hover:bg-[#0f5ea0] text-white px-6 py-3 rounded-full font-medium transition-all"
                    >
                        Send
                    </button>

                </div>
            </div>

        </div>)
}