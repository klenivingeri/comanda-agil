"use client";
import { useState, useRef, useEffect } from "react";
import { IconArrowRight } from "../../../public/icons/ArrowRight";
import { IconArrowDown } from "../../../public/icons/ArrowDown";
import { Item } from "./Item";

function SubTitle({
  inputText,
  type,
  typeLabel,
  items,
  isOpen,
  onToggle,
  handleRemoveItemsSelected,
  handleUpdateItemsSelected,
}) {
  const [height, setHeight] = useState(0);
  const [totalItemsInTheCategory, setTotalItemsInTheCategory] = useState(0);
  const contentRef = useRef(null);

  const handleAddTotalItemsInTheCategiry = () => {
    setTotalItemsInTheCategory((value) => value + 1);
  };

  const handleRemoveTotalItemsInTheCategiry = () => {
    setTotalItemsInTheCategory((value) => value - 1);
  };

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, items]);

  return (
    <div className="w-full">
      {!inputText && (
        <div
          className="font-bold cursor-pointer select-none flex w-full my-1"
          onClick={onToggle}
        >
          <div className="bg-[var(--bg-subTitle)] grid grid-cols-12 w-full border-b-1 border-gray-200 shadow-md shadow-gray-200/50  px-2 py-4">
            <div className="col-span-9">
              <span className="text-2xl">{typeLabel}</span>
            </div>
            <div className="flex col-span-3 justify-end content-center items-center ">
              {totalItemsInTheCategory ? (
                <div className="text-white px-4 mr-3 rounded-3xl bg-[var(--button)]">
                  {totalItemsInTheCategory}
                </div>
              ) : (
                ""
              )}
              <div className="w-4 h-4 flex justify-center items-center">
                <span>{isOpen ? <IconArrowDown /> : <IconArrowRight />}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen || inputText ? `${height || 999}px` : "0px",
          overflow: inputText ? "" : "hidden",
          transition: "max-height 0.3s ease, opacity 0.5s ease",
          opacity: isOpen || inputText ? 1 : 0,
        }}
      >
        <div>
          {items.map((item, idx) => (
            <Item
              key={idx}
              item={item}
              handleAddTotalItemsInTheCategiry={
                handleAddTotalItemsInTheCategiry
              }
              handleRemoveTotalItemsInTheCategiry={
                handleRemoveTotalItemsInTheCategiry
              }
              handleRemoveItemsSelected={handleRemoveItemsSelected}
              handleUpdateItemsSelected={handleUpdateItemsSelected}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const ItemList = ({
  inputText,
  items,
  handleRemoveItemsSelected,
  handleUpdateItemsSelected,
}) => {
  const [openType, setOpenType] = useState(null);

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
    if (inputText) {
      setOpenType(null);
    }
  }, [inputText]);

  return (
    <div className="h-full w-full">
      {Object.entries(groupedItems).map(([type, items]) => (
        <SubTitle
          inputText={inputText}
          key={type}
          type={type}
          typeLabel={typeLabels[type]}
          items={items}
          isOpen={openType === type}
          onToggle={() => setOpenType(openType === type ? null : type)}
          handleRemoveItemsSelected={handleRemoveItemsSelected}
          handleUpdateItemsSelected={handleUpdateItemsSelected}
        />
      ))}
    </div>
  );
};
