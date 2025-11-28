import React, { useEffect, useMemo } from "react";
import { Item } from "./Item";
import { IconArrowDown } from "public/icons/ArrowDown";
import { IconArrowRight } from "public/icons/ArrowRight";
import { ButtonContainer } from "src/components/button";
import { IconDelete } from "public/icons/Delete";
import { IconEdit } from "public/icons/Edit";

const Title = ({
  items,
  isOpen,
  onToggle,
  category,
}) => {
  const total = useMemo(() => {
    return items
      .filter((item) => item.category.type === category.type)
      .reduce((acc, item) => {
        if (item?.quantity) {
          return acc + item?.quantity;
        }
        return acc;
      }, 0);
  }, [items, category.type]);

  return (
    <h2 onClick={onToggle} className="flex px-2  text-xl font-medium h-14 items-center justify-between"><div>{category.name}</div>
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
    </h2>
  )
}

const ItemList = ({
  items,
  isOpen,
  category,
  onToggle,
  inputText,
  showListComanda,
  handleUpdateItemsSelected,
  isEdit,
  handleDelete
}) => {
  return <div className={`${!inputText ? 'bg-[var(--bg-component)] mb-2 rounded-lg shadow-md py-1' : ''} `}>
    {!inputText && (
      <Title category={category} items={items} isOpen={isOpen} onToggle={onToggle} />
    )}
    <div className={`${!inputText ? 'px-2' : ''} `}>
      {(isOpen || inputText) && items?.filter((item) => {
        if (!inputText?.length) return true;
        return `${item.code} - ${item.name}`
          .toLowerCase()
          .includes(inputText.trim().toLowerCase());
      })
        .map((item, i) => (
          <div
            key={item._id}
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'forwards' }}>
            {!isEdit ? <Item
              key={item._id}
              item={item}
              handleUpdateItemsSelected={handleUpdateItemsSelected}
              showListComanda={showListComanda} />
              : <div
                className={`flex p-2 my-2 content-center bg-[var(--bg-component)] items-center justify-between border-2 border-[var(--bg-subTitle)]  rounded-md shadow-lg shadow-[var(--bg-subTitle)]/50`}
              >
                <p className="font-semibold ">{item.name}</p>
                <div className="flex gap-4">
                  <ButtonContainer
                    style="buttonRed"
                    wFull="w-10"
                    hFull="h-9"
                    margin="mt-1"
                    onClick={() => handleDelete(item._id)}
                  >
                    <IconDelete size="h-[20px] w-[20px]" />
                  </ButtonContainer>
                  <ButtonContainer
                    href={`/produto/cadastrar/${item._id}`}
                    wFull="w-10"
                    hFull="h-9"
                    margin="mt-1"
                  >
                    <IconEdit size="h-[20px] w-[20px]" />
                  </ButtonContainer>
                </div>
              </div>
            }
          </div>
        ))}
    </div>
  </div>
}

export const ItemLists = ({
  items,
  openType,
  inputText,
  setOpenType,
  showListComanda,
  handleUpdateItemsSelected,
  _category,
  isEdit,
  handleDelete
}) => {
  const listagem = useMemo(() => {
    const calculatedList = [];

    if (!_category || !_category.all) {
      return calculatedList;
    }
    const categorySort = _category.all.sort((a, b) => {
      return a.type.localeCompare(b.type);
    });

    categorySort.forEach((category) => {
      const itemsFiltrados = items.filter((i) => i.category?._id === category._id && category.enable);

      if (itemsFiltrados.length > 0) {
        calculatedList.push({ category: category, items: itemsFiltrados });
      }
    });

    return calculatedList;
  }, [items, inputText, _category.all]);

  useEffect(() => {
    if (inputText) {
      setOpenType(null);
    }
  }, [inputText]);

  return (
    <div>
      {listagem.map(({ category, items }, i) => (
        <div key={category._id}
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: `${i * 0.04}s`, animationFillMode: 'forwards' }}>
          <ItemList
            isOpen={openType === category.type}
            items={items}
            inputText={inputText}
            handleUpdateItemsSelected={handleUpdateItemsSelected}
            showListComanda={showListComanda}
            category={category}
            onToggle={() => setOpenType(openType === category.type ? null : category.type)}
            isEdit={isEdit}
            handleDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  );
}


