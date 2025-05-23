import { useEffect } from "react";
import CustomButton from "./button";
import { CrossIcon } from "@/icons/icons";
function Modal({ children, visible = true, setVisible }) {
  // useEffect(() => {
  //   return () => {
  //     setVisible(false);
  //   };
  // }, []);

  return (
    <div
      onClick={() => setVisible()}
      className={
        visible
          ? "fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center  h-full w-full"
          : "hidden"
      }
    >
      <div className=" p-8  rounded-xl min-w-64 h-fit flex flex-col mx-auto w-fit">
        <div
          className="relative"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className="absolute top-0 right-0 w-10 h-10 rounded primary-bg p-2 cursor-pointer z-50 hover:bg-[var(--error)] transition duration-200 ease-linear">
            <button
              className="cursor-pointer"
              onClick={() => {
                setVisible();
              }}
            >
              <CrossIcon></CrossIcon>
            </button>
          </div>
          <div className="mx-auto w-full bg-[var(--primary)] flex flex-col items-center rounded-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
