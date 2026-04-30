import { IoIosArrowRoundForward } from "react-icons/io";

export const Button = ({
  text = "Create Account",
  type = "submit",
  handleFunc,
  loading = false,
}) => {
  return (
    <button
      type={type}
      onClick={handleFunc}
      disabled={loading} // disable while loading
      className={`flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#005bb0] to-[#62a1ff] font-bold text-white shadow-sm transition-transform duration-200 hover:scale-105 ${loading ? "cursor-not-allowed opacity-70" : ""}`} // optional styling when loading
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
          Loading...
        </span>
      ) : (
        <>
          <span>{text}</span>
          <IoIosArrowRoundForward size={28} className="mt-1" />
        </>
      )}
    </button>
  );
};
