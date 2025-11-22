import { useState, useRef } from "react";
import { IconImageEmpty } from "../../../public/icons/ImageEmpty";
import { resizeImage } from "src/app/utils/resizeImage";

export const InputFileComponent = ({
  label = "InputFile",
  value,
  setValue = () => {},
}) => {

  const [preview, setPreview] = useState(null);
  const contentRef = useRef(null);

  const handleFileChange = async (e) => {
    const originalFile = e.target.files[0];
    const processedFile = await resizeImage(originalFile);
    if (processedFile) {
      setValue(processedFile); 
    
      const imageUrl = URL.createObjectURL(processedFile); 
      setPreview(imageUrl);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-5 h-[200px] ">
      <input
        type="file"
        id={label}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        ref={contentRef}
      />

      {preview || value?.length ? (
        <div
          onClick={() => {
            contentRef.current?.click();
          }}
          className={`w-[200px] h-[200px] bg-cover bg-top rounded-full`}
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
