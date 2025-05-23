import { DownArrowIcon } from "@/icons/icons";
import { useState, useRef, useEffect } from "react";

export default function CustomSelect({
  label,
  options = [],
  callback,
  required,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0] || {});
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    callback(option.value);
    setIsOpen(false);
  };

  return (
    <div
      className="flex flex-col gap-2 relative min-w-full w-fit text-nowrap"
      ref={ref}
    >
      <label className="h4">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border border-[var(--link)] rounded-md p-2 cursor-pointer flex justify-between items-center text-[16px]"
      >
        <div className="flex items-center gap-2 px-2">
          {selected.img && (
            <img src={selected.img} alt="" className="w-5 h-5" />
          )}
          <span>{selected.label}</span>
        </div>
        <DownArrowIcon></DownArrowIcon>
      </div>

      {isOpen && (
        <div className="absolute z-10 min-w-full bg-white border  rounded shadow max-h-60 overflow-y-auto ">
          {options.map((option) => (
            <div
              key={option.value}
              className="p-2 hover:bg-gray-100 cursor-pointer flex gap-2 items-center text-[16px]"
              onClick={() => handleSelect(option)}
            >
              {option.img && (
                <img src={option.img} alt="" className="w-5 h-5" />
              )}
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
