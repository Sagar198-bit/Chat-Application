export const Card = ({username, profile, status, message}) => {
    return (<div className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-100 cursor-pointer transition-all duration-200">
        <img
            src={profile}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover"
        />

        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-slate-800">
                    {username}
                </h3>

                <span className="text-xs text-slate-400">
        {status}
      </span>
            </div>

            <p className="text-sm text-slate-500 truncate">
                {message}
            </p>
        </div>
    </div>)
}
