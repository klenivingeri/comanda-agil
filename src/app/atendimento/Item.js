"use client";

import React, { useState } from "react";
import { currency } from "../../app/utils/currency";
import { SelectQuantity } from "./SelectQuantity";
import { IconImageEmpty } from "public/icons/ImageEmpty";
import { Button } from "src/components/button/Button";
import { CenterModal } from "src/components/modal";

export const Item = ({
  item,
  handleUpdateItemsSelected,
  handleDeleteItemSelected,
  hiddeSelectQuantity,
  uuidItemInCommand,
  itemInNote = false,
  hideValue,
  showDelete = false,
}) => {
  const [openCenterModal, setOpenCenterModal] = useState(false);

  const handleAdd = () => {
    if (item?.quantity) {
      handleUpdateItemsSelected(item, item.quantity + 1);
    } else {
      handleUpdateItemsSelected(item, 1);
    }
  };

  const handleRemove = () => {
    handleUpdateItemsSelected(item, item.quantity - 1);
  };

  const handleDelete = () => {
    setOpenCenterModal(true);
  };

  return (
    <div className=" flex my-2 py-2 content-center bg-[var(--bg-component)] items-center justify-between border-2 border-[var(--bg-subTitle)]  rounded-md shadow-lg shadow-[var(--bg-subTitle)]/50">
      {itemInNote ? (
        <div className="text-3xl min-w-[50px] max-w-[50px] text-shadow-md shadow-[var(--bg-subTitle)]/50 flex justify-center content-center">
          {item?.quantity}
        </div>
      ) : (
        <div className="ml-2 flex h-12 min-w-[60px] w-[70px] items-center justify-center border-1 border-[var(--text-default)]/20 rounded-sm p-1 cursor-pointer transition overflow-hidden text-[var(--text-default)]/20">
          <IconImageEmpty size="h-[32px] w-[32px]" />
        </div>
      )}
      <div className="truncate w-full flex flex-col px-2 py-1 ">
        <span className="font-semibold truncate text-sm mr-2">
          {item.code} - {item.name}
        </span>
        <span className="text-xs mt-[-2px] text-gray-500">
          {currency(item.price)}
        </span>
      </div>

      {!hiddeSelectQuantity ? (
        <SelectQuantity
          handleAdd={handleAdd}
          handleRemove={handleRemove}
          value={item?.quantity || 0}
          hideValue={hideValue}
        />
      ) : (
        showDelete && (
          <div
            style={{ width: "40px" }}
            className="flex justify-center content-center mr-2 mt-1"
          >
            <Button
              onClick={handleDelete}
              wFull="w-9"
              hFull="h-8"
              text="〤"
              padding="py-4 "
              style="buttonRed"
            />
          </div>
        )
      )}
      <CenterModal
        isOpen={openCenterModal}
        onClose={() => setOpenCenterModal(false)}
      >
        <div className="p-6 sm:p-8 flex flex-col items-center text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-red-600 mt-4 mb-2">
            Atenção! Confirma a Exclusão?
          </span>
          <p className="text-lg text-gray-700 mb-4">
            Você está prestes a deletar o seguinte item. Esta ação é
            **irreversível**.
          </p>
          <div className="w-full bg-gray-100 p-3 sm:p-4 rounded-lg my-4 border border-gray-200">
            <p className="text-xl font-semibold text-gray-900">
              {item.code} - {item.name}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row w-full gap-3 mt-6">
            <Button
              onClick={() => {
                handleDeleteItemSelected(uuidItemInCommand);
                setOpenCenterModal(false);
              }}
              text="Deletar Permanentemente"
              style="buttonRed"
              hFull="h-10"
            />
          </div>
        </div>
      </CenterModal>
    </div>
  );
};
