export const Input = ({
  type = "text",
  label,
  id,
  value,
  name,
  placeholder,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-3 ml-1 block text-xs font-bold text-[#4e5a81] uppercase"
      >
        {label}
      </label>
      <input
        className="h-12 w-full rounded-2xl bg-[#eef0ff] px-6 py-1 font-medium text-slate-500 outline-none"
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
      />
      {type === "password" && (
        <span className="mt-2 ml-1 text-xs font-medium">
          Must be at least 8 characters with a symbol.
        </span>
      )}
    </div>
  );
};
