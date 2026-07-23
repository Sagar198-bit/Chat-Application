export const Card = ({id, username, profile, status, handleUser, messages}) => {
    return (
        <div onClick={() => handleUser({id, username})} className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl hover:bg-slate-100 active:bg-slate-100 cursor-pointer transition-all duration-200">
            <img
                src={profile}
                alt="profile"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover shrink-0"
            />

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center gap-2">
                    <h3 className="font-semibold text-slate-800 truncate">
                        {username}
                    </h3>
                    <span className="text-xs text-slate-400 shrink-0">
                        {status}
                    </span>
                </div>

                <p className="text-sm text-slate-500 truncate">
                    {messages}
                </p>
            </div>
        </div>
    )
}