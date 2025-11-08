import React, { useEffect, useMemo } from "react";
import { useCategory } from "src/app/context/CategoryContext";
import { Item } from "./Item";
import { IconArrowDown } from "public/icons/ArrowDown";
import { IconArrowRight } from "public/icons/ArrowRight";

const Title = ({ category, items, isOpen, onToggle }) => {
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

const ItemList = ({ items, inputText, handleUpdateItemsSelected, showListComanda, category, isOpen, onToggle }) => {
  return <div className={`${!inputText ? 'bg-white mb-2 rounded-lg shadow-md py-1' : ''} `}>
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
        .map((item) => (
          <Item
            key={item._id}
            item={item}
            handleUpdateItemsSelected={handleUpdateItemsSelected}
            showListComanda={showListComanda} />
        ))}
    </div>
  </div>
}


export const ItemLists = ({ inputText,
  items,
  handleUpdateItemsSelected,
  showListComanda,
  openModal,
  openType,
  setOpenType
}) => {
  const { _category } = useCategory();
  const listagem = useMemo(() => {
    const calculatedList = [];

    if (!_category || !_category.all) {
      return calculatedList;
    }

    _category.all.forEach((category) => {
      const itemsFiltrados = items.filter(
        (i) => i.category._id === category._id && category.enable
      );

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
      {listagem.map(({ category, items }) => (
        <div key={category._id}>
          <ItemList
            isOpen={openType === category.type}
            items={items}
            inputText={inputText}
            handleUpdateItemsSelected={handleUpdateItemsSelected}
            showListComanda={showListComanda}
            category={category}
            onToggle={() => setOpenType(openType === category.type ? null : category.type)}
          />
        </div>
      ))}
    </div>
  );
}


