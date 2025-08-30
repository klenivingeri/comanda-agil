"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { IconArrowRight } from "../../../../public/icons/ArrowRight";
import { IconArrowDown } from "../../../../public/icons/ArrowDown";
import { Item } from "./Item";

function SubTitle({
  inputText,
  type,
  typeLabel,
  items,
  isOpen,
  onToggle,
  handleUpdateItemsSelected,
  showListComanda,
}) {
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight || 0);
    }
  }, [isOpen, items]);

  const total = useMemo(() => {
    return items
      .filter((item) => item.type === type)
      .reduce((acc, item) => {
        if (item?.quantity) {
          return acc + item?.quantity;
        }
        return acc;
      }, 0); // garante número
  }, [items, type]);

  return (
    <div className="w-full">
      {!inputText && (
        <div
          className="font-bold cursor-pointer select-none flex w-full my-1"
          onClick={onToggle}
        >
          <div className="bg-[var(--bg-subTitle)] grid grid-cols-12 w-full border-b-1 border-[var(--text)] shadow-md shadow-[var(--text)]/50 px-2 py-4">
            <div className="col-span-9">
              <span className="text-2xl">{typeLabel}</span>
            </div>
            <div className="flex col-span-3 justify-end content-center items-center ">
              {!!total && (
                <div className="text-[var(--text)] px-3 mr-3 rounded-3xl bg-[var(--bg-alert)] shadow-md">
                  {total}
                </div>
              )}
              <div className="w-4 h-4 flex justify-center items-center ">
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
          {items
            .filter((item) => {
              if (!inputText.length) return true;
              return `${item.id} - ${item.name}`
                .toLowerCase()
                .includes(inputText.trim().toLowerCase());
            })
            .map((item, idx) => (
              <Item
                key={item.id}
                item={item}
                handleUpdateItemsSelected={handleUpdateItemsSelected}
                showListComanda={showListComanda}
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
  handleUpdateItemsSelected,
  showListComanda,
}) => {
  if (items.length <= 0) return;
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
          handleUpdateItemsSelected={handleUpdateItemsSelected}
          showListComanda={showListComanda}
        />
      ))}
    </div>
  );
};
