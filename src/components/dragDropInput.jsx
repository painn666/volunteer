import { useState } from "react";
import { DragDropIcon } from "@/icons/icons";

function DragDropInput({ setFile, file, wIcon = true, maxH }) {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  return (
    <label
      htmlFor="file-upload"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col items-center justify-center ${
        wIcon ? `aspect-square max-h-[350px] py-8` : ""
      } border-2 rounded-lg cursor-pointer  transition  ${
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-400 hover:bg-gray-50"
      }`}
    >
      {file ? (
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          style={{ maxHeight: maxH ? maxH : "350px" }}
          className={`  max-w-full object-contain py-2`}
        />
      ) : (
        <>
          {wIcon ? <DragDropIcon /> : ""}
          <p className="h4 text-[var(--link)] text-center">
            Перетащіть або виберіть файл для завантаження
          </p>
        </>
      )}
      <input
        id="file-upload"
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={(e) => setFile(e.target.files[0])}
      />
    </label>
  );
}

export default DragDropInput;
