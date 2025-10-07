import { useState, useRef } from "react";
import { IconImageEmpty } from "../../../public/icons/ImageEmpty";

export const InputFileComponent = ({
  label = "InputFile",
  value,
  setValue = () => {},
  id,
}) => {
  const [preview, setPreview] = useState(null);
  const contentRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue(id, file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-5 h-40 ">
      <input
        type="file"
        id={label}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        ref={contentRef}
      />

      {preview || value ? (
        <div
          onClick={() => {
            contentRef.current?.click();
          }}
          className={`w-full h-40 bg-cover bg-top rounded-t-2xl`}
          style={{ backgroundImage: `url(${preview || value})` }}
        ></div>
      ) : (
        <label
          htmlFor={label}
          className="flex items-center justify-center w-20 h-20 border-2 border-gray-400 p-4 rounded-2xl cursor-pointer transition overflow-hidden text-black"
        >
          <IconImageEmpty className="w-8 h-8 " />
        </label>
      )}
    </div>
  );
};
