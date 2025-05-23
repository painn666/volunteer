function CustomButton({
  children,
  callback,
  bgColor,
  text,
  textClass,
  p,
  w,
  isInactive = false,
  formId,
  type,
}) {
  return (
    <button
      type={type}
      form={formId}
      disabled={isInactive}
      onClick={() => {
        callback();
      }}
      className={`${
        bgColor && !isInactive
          ? bgColor
          : isInactive
          ? "bg-gray-300"
          : "bg-[var(--primary)]"
      } ${text ?? "text-[var(--secondary)]  "}  py-5 ${p ?? "10px"} ${
        textClass ?? "font-bold text-[32px]"
      } text-center ${isInactive ? "" : "cursor-pointer"} ${
        w ?? "w-fit"
      } rounded-xl`}
    >
      {children}
    </button>
  );
}

export default CustomButton;
