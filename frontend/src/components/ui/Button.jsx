import { IoIosArrowRoundForward } from "react-icons/io";

export const Button = ({ text = "Create Account", type = "submit" }) => {
  return (
    <button
      type={type}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-full 
      bg-gradient-to-r from-[#005bb0] to-[#62a1ff] 
      font-bold text-white shadow-sm 
      transition-transform duration-200 hover:scale-105"
    >
      <span>{text}</span>
      <IoIosArrowRoundForward size={28} className="mt-1" />
    </button>
  );
};