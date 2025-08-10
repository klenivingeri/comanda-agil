"use client";
import { useState, useRef, useEffect } from "react";
import { IconArrowRight } from "../../../public/icons/ArrowRight";
import { IconArrowDown } from "../../../public/icons/ArrowDown";
import { Item } from "./Item";

function SubTitle({ type, typeLabel, items, isOpen, onToggle }) {
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, items]);

  return (
    <div className="mb-2 w-full">
      <div
        className="font-bold cursor-pointer select-none flex w-full"
        onClick={onToggle}
      >
        <div className="bg-[var(--bg-subTitle)] grid grid-cols-12 w-full border-b-1 border-gray-200 shadow-md shadow-gray-200/50  px-2 py-4">
          <div className="col-span-11">{typeLabel}</div>
          <div className="flex col-span-1 justify-end content-center items-center">
            {isOpen ? <IconArrowDown /> : <IconArrowRight />}
          </div>
        </div>
      </div>
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${height || 999}px` : "0px",
          overflow: "hidden",
          transition: "max-height 0.3s ease, opacity 0.5s ease",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div>
          {items.map((item, idx) => (
            <Item key={idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const SubItems = ({ items }) => {
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

  return Object.entries(groupedItems).map(([type, items]) => (
    <SubTitle
      key={type}
      type={type}
      typeLabel={typeLabels[type]}
      items={items}
      isOpen={openType === type}
      onToggle={() => setOpenType(openType === type ? null : type)}
    />
  ));
};
