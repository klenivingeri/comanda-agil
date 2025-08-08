"use client";
import { useState, useRef, useEffect } from "react";
import { IconArrowRight } from "../../../public/icons/ArrowRight";
import { IconArrowDown } from "../../../public/icons/ArrowDown";
import { currency } from "../utils/currency";

const SelectQuantity = ({ handleAdd, handleRemove, value }) => {
  return (
    <div className="flex items-center justify-end">
      {value !== 0 && (
        <>
          <div style={{ width: "40px" }}>
            <button
              className="flex w-full h-10 justify-center items-center border-x-2 border-x-gray-400 border-t-2 border-b-2 border-t-gray-300 border-b-gray-500 rounded-md"
              onClick={handleRemove}
            >
              -
            </button>
          </div>
          <div style={{ width: "40px" }}>
            <div className="flex w-full h-10 justify-center items-center text-4xl ">
              {value}
            </div>
          </div>
        </>
      )}
      <div style={{ width: "40px" }}>
        <button
          className="flex w-full h-10 text-white justify-center items-center border-t-2 border-b-4 border-t-gray-500 bg-gray-700 border-b-gray-800 rounded-md"
          onClick={handleAdd}
        >
          +
        </button>
      </div>
    </div>
  );
};

const Item = ({ item }) => {
  const [value, setValue] = useState(0);

  const handleAdd = () => {
    setValue((value) => value + 1);
  };
  const handleRemove = () => {
    setValue((value) => {
      const result = value - 1;

      return result <= 0 ? 0 : result;
    });
  };
  return (
    <div className="flex my-2 content-center bg-white items-center justify-between border-2 border-white border-l-4 rounded-md shadow-lg shadow-gray-100/50">
      <div className="truncate w-full flex flex-col">
        <span className="font-semibold truncate mr-2">{item.name}</span>
        <span className="">{currency(item.price)}</span>
      </div>
      <SelectQuantity
        handleAdd={handleAdd}
        handleRemove={handleRemove}
        value={value}
      />
    </div>
  );
};

export const ItemList = ({ items, inputText }) => {
  const [openType, setOpenType] = useState(null);
  const [height, setHeight] = useState({});
  const contentRefs = useRef({});

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  const typeLabels = {};
  items.forEach((item) => {
    if (!typeLabels[item.type]) {
      typeLabels[item.type] = item.typeLabel;
    }
  });

  useEffect(() => {
    if (openType && contentRefs.current[openType]) {
      setHeight((h) => ({
        ...h,
        [openType]: contentRefs.current[openType].scrollHeight,
      }));
    }
  }, [openType, inputText, items]);

  return (
    <div className="h-full w-full">
      {inputText ? (
        <div className="" key={idx}>
          {items
            .filter((i) =>
              `${i.id} - ${i.name}`
                .toLowerCase()
                .includes(inputText.toLowerCase())
            )
            .map((item, idx) => (
              <Item key={idx} item={item} />
            ))}
        </div>
      ) : (
        Object.entries(groupedItems).map(([type, items]) => {
          const isOpen = openType === type;
          return (
            <div key={type} className="mb-2 w-full">
              <div
                className="font-bold cursor-pointer select-none flex w-full"
                onClick={() => setOpenType(isOpen ? null : type)}
              >
                <div className="grid grid-cols-12 w-full border-b-1 border-gray-200 shadow-md shadow-gray-200/50  px-2 py-4">
                  <div className="col-span-11">{typeLabels[type]}</div>
                  <div className="flex col-span-1 justify-end content-center items-center">
                    {isOpen ? <IconArrowDown /> : <IconArrowRight />}
                  </div>
                </div>
              </div>
              <div
                ref={(el) => (contentRefs.current[type] = el)}
                style={{
                  maxHeight: isOpen ? `${height[type] || 999}px` : "0px",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                }}
              >
                <div className="">
                  {items.map((item, idx) => (
                    <Item key={idx} item={item} />
                  ))}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
