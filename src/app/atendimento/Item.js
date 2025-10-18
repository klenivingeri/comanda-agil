"use client";

import React, { useState } from "react";
import { currency } from "../../app/utils/currency";
import { SelectQuantity } from "./SelectQuantity";
import { IconImageEmpty } from "public/icons/ImageEmpty";
import { ButtonContainer } from "src/components/button";
import { CenterModal } from "src/components/modal";
import { IconDelete } from "public/icons/Delete";
import { Select } from "src/components/form/FormComponents";

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
  const [quantityToBeDeleted, setQuantityToBeDeleted] = useState(1);

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

  const handlesTheAmountOfItemsToBeDeleted = () => {
    const rest = item.quantity - quantityToBeDeleted;

    handleDeleteItemSelected(uuidItemInCommand, rest);
  };

  return (
    <div className="flex flex-col my-2">
      <div
        className={`flex 
        } py-2 content-center bg-[var(--bg-component)] items-center justify-between border-2 border-[var(--bg-subTitle)]  rounded-md shadow-lg shadow-[var(--bg-subTitle)]/50`}
      >
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
              <ButtonContainer
                onClick={handleDelete}
                wFull="w-9"
                hFull="h-8"
                padding="py-4 "
                style="buttonRed"
              >
                <IconDelete size="h-[20px] w-[20px]" />
              </ButtonContainer>
            </div>
          )
        )}
      </div>
      {item?.user?.name && (
        <div className="flex mt-[-13px] ml-[14px] ">
          <div className="bg-[var(--bg-component)] flex rounded-full shadow-lg border-b-2 border-[var(--bg-subTitle)] ">
            {item?.user?.image && (
              <div
                className="bg-cover bg-center rounded-full w-7 h-7 shadow-sm"
                // 💡 APLICAÇÃO DO ESTILO INLINE para a background-image
                style={{ backgroundImage: `url('${item.user.image}')` }}
              ></div>
            )}

            <p className="ml-2  px-2">{item?.user?.name}</p>
          </div>
        </div>
      )}
      <CenterModal
        isOpen={openCenterModal}
        onClose={() => setOpenCenterModal(false)}
      >
        <div className="p-6 sm:p-8 flex flex-col items-center text-center">
          <span className="text-2xl sm:text-3xl font-extrabold text-red-600 mt-4 mb-2">
            Confirmar Exclusão!
          </span>
          <p className="text-lg mb-2">
            Você está prestes a deletar o seguinte item.
          </p>
          <div className="w-full bg-gray-100 p-3 sm:p-4 rounded-lg my-4 border border-gray-200">
            <p className="text-xl font-semibold text-gray-900">
              {item.code} - {item.name}
            </p>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-900"
            >
              Quantidade a ser Deletada:
              <div className="flex flex-row items-center gap-2 ">
                <select
                  onChange={(e) => setQuantityToBeDeleted(e.target.value)}
                  value={quantityToBeDeleted}
                  className="w-full px-4 py-3 text-xl font-semibold h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:ring-[var(--button-focus)] outline-none bg-[var(--input-default)] text-black text-center"
                >
                  {Array.from({ length: item.quantity }, (v, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </label>
          </div>
          Esta ação é **irreversível**.
          <div className="flex flex-col sm:flex-row w-full gap-3 mt-6">
            <ButtonContainer
              onClick={() => {
                handlesTheAmountOfItemsToBeDeleted();
                setOpenCenterModal(false);
              }}
              text="Deletar"
              style="buttonRed"
              hFull="h-10"
            />
          </div>
        </div>
      </CenterModal>
    </div>
  );
};
