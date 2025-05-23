function ModalComponent({ children }) {
  return (
    <div className="flex flex-col items-center gap-4 px-4 py-6 max-w-[500px] max-md:max-w-[300px]">
      {children}
    </div>
  );
}

export default ModalComponent;
