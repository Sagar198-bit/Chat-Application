import Avatar from "../../../public/avatar.webp";
import {useSelector} from "react-redux";
import { useRef ,useState , useEffect} from "react";
import {Socket} from "../../socket/socket.js"
import { MdCancel, MdArrowBack } from "react-icons/md";

export const ChatForm = ({user , status, handleUser}) => {
    const {id: receiverId, username} = user
    const {data} = useSelector((state) => state.Auth)
    const currentUserId = data?.data?._id
    const isOnline = status.includes(receiverId)
    const [textInput, setTextInput] = useState("")
    const [messages, setMessages] = useState([])
    const [isReceiverTyping, setIsReceiverTyping] = useState(false);
    const typingTimeoutRef = useRef(null);

    const handleChange = (event) => {
        setTextInput(event.target.value)
        Socket().emit("typing", {senderId: currentUserId, receiverId})

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        typingTimeoutRef.current = setTimeout(() => {
            Socket().emit("stopTyping", {senderId: currentUserId, receiverId})
        }, 2000)
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

        setMessages((prev) => [...prev, newMessage])
        Socket().emit("sendMessage", newMessage)
        setTextInput("")
    }

    useEffect(() => {
        const handleIncoming = (message) => {
            setMessages((prev) => [...prev, message]);
        };
        Socket().on("receiveMessage", handleIncoming);
        return () => Socket().off("receiveMessage", handleIncoming);
    }, []);

    useEffect(() => {
        const handleTyping = ({senderId}) => {
            if (senderId === receiverId) setIsReceiverTyping(true)
        }
        const handleStopTyping = ({senderId}) => {
            if (senderId === receiverId) setIsReceiverTyping(false)
        }
        Socket().on("userTyping", handleTyping)
        Socket().on("userStoppedTyping", handleStopTyping)
        return () => {
            Socket().off("userTyping", handleTyping)
            Socket().off("userStoppedTyping", handleStopTyping)
        }
    }, [])

    return (<div className="flex flex-col w-full h-full bg-slate-50">

        {/* Header */}
        <div className="h-16 bg-white px-3 sm:px-5 flex items-center justify-between shadow-sm shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                {/* Back button - mobile only */}
                <button onClick={handleUser} className="md:hidden shrink-0 text-slate-500 hover:text-slate-700">
                    <MdArrowBack size={22}/>
                </button>

                <img
                    src={Avatar}
                    alt="profile"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shrink-0"
                />

                <div className="min-w-0">
                    <h2 className="font-semibold text-slate-800 truncate">
                        {username}
                    </h2>

                    <p className={`text-xs sm:text-sm flex items-center gap-1 ${isOnline ? "text-green-500" : "text-slate-400"}`}>
                        {isReceiverTyping ? (
                            <span className="italic text-slate-500">typing...</span>
                        ) : (
                            <>
                                <span className={`text-xs ${isOnline ? "text-green-500" : "text-slate-400"}`}>●</span>
                                {isOnline ? "Online" : "Offline"}
                            </>
                        )}
                    </p>
                </div>
            </div>

            {/* Cancel button - desktop only, since mobile uses back button */}
            <div className="hidden md:block">
                <MdCancel size={25} onClick={handleUser} className="cursor-pointer text-slate-400 hover:text-slate-600"/>
            </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-5 space-y-3 sm:space-y-4">
            {messages.map((message) => {
                const isMine = message.senderId === currentUserId
                return (<div key={message.id} className={isMine ? "flex justify-end" : "flex justify-start"}>
                    <div
                        className={isMine
                            ? "bg-[#1372c1] text-white px-4 py-2.5 sm:py-3 rounded-2xl rounded-br-md shadow-sm max-w-[80%] sm:max-w-sm break-words"
                            : "bg-white px-4 py-2.5 sm:py-3 rounded-2xl rounded-bl-md shadow-sm max-w-[80%] sm:max-w-sm break-words"}
                    >
                        {message.text}
                    </div>
                </div>)
            })}

            {isReceiverTyping && (
                <div className="flex justify-start">
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm flex gap-1">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                    </div>
                </div>
            )}
        </div>

        {/* Input */}
        <div className="bg-white p-3 sm:p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
                <input
                    type="text"
                    value={textInput}
                    onChange={handleChange}
                    placeholder="Type a message..."
                    className="flex-1 min-w-0 bg-slate-100 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 outline-none focus:ring-2 focus:ring-[#1372c1]"
                />

                <button
                    onClick={handleSubmit}
                    className="bg-[#1372c1] hover:bg-[#0f5ea0] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium transition-all shrink-0"
                >
                    Send
                </button>
            </div>
        </div>

    </div>)
}