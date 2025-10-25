"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
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
      .filter((item) => item.category.type === type)
      .reduce((acc, item) => {
        if (item?.quantity) {
          return acc + item?.quantity;
        }
        return acc;
      }, 0); // garante número
  }, [items, type]);

  return (
    <div
      className={`w-full ${
        isOpen
          ? "bg-[var(--bg-component)] shadow-md shadow-[var(--text-default)]/50 mb-2"
          : ""
      }`}
    >
      {!inputText && (
        <div
          className="font-bold cursor-pointer select-none flex w-full my-1"
          onClick={onToggle}
        >
          <div
            className={`bg-[var(--bg-component)] grid grid-cols-12 w-full ${
              isOpen ? "pt-4" : "shadow-md shadow-[var(--text-default)]/50 py-4"
            } px-2 `}
          >
            <div className="col-span-9">
              <span className="text-1xl font-semibold">{typeLabel}</span>
            </div>
            <div className="flex col-span-3 justify-end content-center items-center ">
              {!!total && (
                <div className="text-[var(--button-default)] px-3 mr-3 rounded-3xl bg-[var(--button-disabled)]/10 border-b-1 border-b-[var(--button-default)] shadow-md">
                  {total}
                </div>
              )}
              <div className="w-4 h-4 flex justify-center ">
                <span className="text-[var(--text-default)]">
                  {isOpen ? <IconArrowDown /> : <IconArrowRight />}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        ref={contentRef}
        className={!inputText ? "px-2" : ""}
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
              if (!inputText?.length) return true;
              return `${item.code} - ${item.name}`
                .toLowerCase()
                .includes(inputText.trim().toLowerCase());
            })
            .map((item) => (
              <Item
                key={item._id}
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
  openModal,
  openType,
  setOpenType,
}) => {
  if (items?.length <= 0) return;

  const groupedItems = items?.reduce((acc, item) => {
    if (!acc[item.category.type]) acc[item.category.type] = [];
    acc[item.category.type].push(item);
    return acc;
  }, {});

  const typeLabels = {};
  items?.forEach((item) => {
    if (!typeLabels[item.category.type]) {
      typeLabels[item.category.type] = item.category.name;
    }
  });

  useEffect(() => {
    if (inputText) {
      setOpenType(null);
    }
  }, [inputText]);

  return (
    // openModal está aqui pra ajudar a função testParaIniciarDivNoFim
    <div className={` ${openModal ? "hidden" : "h-full"} w-full `}>
      {Object.entries(groupedItems)?.map(([type, items]) => {
        return (
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
        );
      })}
    </div>
  );
};
