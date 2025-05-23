function CustomArea({ placeholder, label, required, callback }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="h4">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        onChange={(e) => {
          callback(e.target.value);
        }}
        required={required}
        placeholder={placeholder}
        className="w-full min-w-[50px] min-h-[150px] border-[1px] rounded-xl border-[var(--link)] p-2"
      ></textarea>
    </div>
  );
}

export default CustomArea;
