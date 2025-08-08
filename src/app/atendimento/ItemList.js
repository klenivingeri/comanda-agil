"use client";
import { useState, useRef, useEffect } from "react";
import { IconArrowRight } from "../../../public/icons/ArrowRight";
import { IconArrowDown } from "../../../public/icons/ArrowDown";
import { currency } from "../utils/currency";

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
    <div className="grid grid-cols-12">
      <div className="col-span-9">
        <div className="truncate mr-2">{`${item.id} - ${item.name}`}</div>
        <div>{currency(item.price)}</div>
      </div>
      <div className="col-span-3">
        <div className="grid grid-cols-3 bg-amber-600">
          <button
            className="flex justify-center items-center col-span-1"
            onClick={handleRemove}
          >
            -
          </button>
          <div className="flex justify-center items-center col-span-1">
            {" "}
            {value}{" "}
          </div>
          <button
            className="flex justify-center items-center col-span-1"
            onClick={handleAdd}
          >
            +
          </button>
        </div>
      </div>
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
                <div className="grid grid-cols-12 w-full border-b-1 border-gray-200 p-2">
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
