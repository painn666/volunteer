import Link from "next/link";
function LinkTo({
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
  href,
}) {
  return (
    <Link
      href={href}
      disabled={isInactive}
      onClick={() => {
        callback ? callback() : true;
      }}
      className={`${
        bgColor && !isInactive
          ? bgColor
          : isInactive
          ? "bg-gray-300"
          : "bg-[var(--primary)]"
      } ${text ?? "text-[var(--secondary)]  "}  py-5 ${p ?? "10px"} ${
        textClass ?? "font-bold text-link"
      } text-center ${isInactive ? "" : "cursor-pointer"} ${
        w ?? "w-fit"
      } rounded-xl`}
    >
      {children}
    </Link>
  );
}

export default LinkTo;
