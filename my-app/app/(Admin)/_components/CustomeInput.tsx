import React from "react";

interface CustomeInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
}

const CustomeInput = ({
  value,
  onChange,
  placeholder,
  type,
}: CustomeInputProps) => {
  return (
    <input
      value={value}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      className="flex-1 px-4 py-2 border border-amber-500/10 rounded-sm outline-none focus:border-amber-500 transition-all duration-200"
    />
  );
};

export default CustomeInput;
