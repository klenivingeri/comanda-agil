import { useState, useRef, useEffect } from "react";
import { IconArrowRight } from "../../../public/icons/ArrowRight";
import { IconArrowDown } from "../../../public/icons/ArrowDown";

const Item = ({ children }) => {
  return <div className="p-2">{children}</div>;
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
            .map((i, idx) => (
              <Item key={idx}>{`${i.id} - ${i.name}`}</Item>
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
                  {items.map((i, idx) => (
                    <Item key={idx}>{`${i.id} - ${i.name}`}</Item>
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
