function CustomInput({
  placeholder,
  type,
  label,
  required,
  callback,
  todayIsMin = true,
  readonly = false,
}) {
  const getTomorrow = () => {
    if (type === "date") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1); // добавляем 1 день
      return tomorrow.toISOString().split("T")[0]; // форматируем как yyyy-mm-dd
    }
  };
  return (
    <div className="w-full min-w-[50px]  border-b-2 border-b-[var(--link)] flex flex-col gap-2 p-2">
      <label className="h4">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        readOnly={readonly}
        onChange={(e) => {
          callback(e.target.value);
        }}
        min={todayIsMin ? getTomorrow() : ""}
        type={type ? type : "text"}
        placeholder={placeholder}
        className="w-full focus:border-none focus:outline-none border-0"
        required={required}
        minLength={type === "password" ? 6 : 0}
      ></input>
    </div>
  );
}

export default CustomInput;
