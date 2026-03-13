import React from "react";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-[10px] font-bold text-blue-900 uppercase tracking-widest mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border-b border-gray-300 focus:border-blue-600 outline-none py-1 bg-transparent transition-all text-sm placeholder:text-gray-300"
      />
    </div>
  );
};

export default InputField;
