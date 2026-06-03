export const DashBoard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-10 text-center">
        <div className="mb-6">
          <span className="text-6xl">💬</span>
        </div>

        <h1 className="text-5xl font-extrabold text-white mb-4">
          Welcome to Chat Dashboard
        </h1>

        <p className="text-lg text-gray-100 mb-8">
          Connect, collaborate, and communicate seamlessly with your team in
          real time.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
            Start Chat
          </button>

          <button className="px-6 py-3 border border-white text-white font-semibold rounded-xl hover:bg-white hover:text-purple-700 transition-all duration-300">
            View Messages
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          <div className="bg-white/10 rounded-2xl p-5 text-white">
            <h3 className="text-2xl font-bold">🚀 Fast</h3>
            <p className="text-sm mt-2">
              Instant messaging with real-time updates.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-5 text-white">
            <h3 className="text-2xl font-bold">🔒 Secure</h3>
            <p className="text-sm mt-2">
              Protected communication and user privacy.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-5 text-white">
            <h3 className="text-2xl font-bold">🌍 Connected</h3>
            <p className="text-sm mt-2">
              Stay connected with your team anywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};