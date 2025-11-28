import React, { useEffect, useMemo, useState } from "react";
import { Item } from "./Item";
import { IconArrowDown } from "public/icons/ArrowDown";
import { IconArrowRight } from "public/icons/ArrowRight";
import { ButtonContainer } from "src/components/button";
import { IconDelete } from "public/icons/Delete";
import { IconEdit } from "public/icons/Edit";
import { CenterTop } from "src/components/modal/ModalTop";
import { FormComponentCategory } from "../categoria/cadastrar/FormComponentCategory";

const Title = ({
  items,
  isOpen,
  onToggle,
  category,
  isEdit,
  handleDeleteCategory,
  handleEditCategory
}) => {
  const total = useMemo(() => {
    return items
      .filter((item) => item.category?.type === category?.type)
      .reduce((acc, item) => {
        if (item?.quantity) {
          return acc + item?.quantity;
        }
        return acc;
      }, 0);
  }, [items, category.type]);
  const hasItems = items.length > 0;
  return (
    <h2 onClick={onToggle} className="flex px-2  text-xl font-medium h-14 items-center justify-between">
      {category.enable ?<div>{category.name}</div> : <div className=""><s>{category.name}</s></div>} 
      <div className="flex col-span-3 justify-end content-center items-center ">
        {!!total && (
          <div className="text-[var(--button-default)] px-3 mr-3 rounded-3xl bg-[var(--button-disabled)]/10 border-b-1 border-b-[var(--button-default)] shadow-md">
            {total}
          </div>
        )}
        {isEdit && <div className="flex gap-4 mr-6">
          {!hasItems && <ButtonContainer
            style="buttonRed"
            wFull="w-10"
            hFull="h-9"
            margin="mt-1"
            onClick={() => handleDeleteCategory(category._id)}
          >
            <IconDelete size="h-[20px] w-[20px]" />
          </ButtonContainer>
          }
          <ButtonContainer
            onClick={(e) => handleEditCategory(category, e)}
            wFull="w-10"
            hFull="h-9"
            margin="mt-1"
          >
            <IconEdit size="h-[20px] w-[20px]" />
          </ButtonContainer>
        </div>}
        <div className="w-4 h-4 flex justify-center ">
          {hasItems && <span className="text-[var(--text-default)]">
            {isOpen ? <IconArrowDown /> : <IconArrowRight />}
          </span>
          }
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
  handleDelete,
  handleDeleteCategory,
  handleEditCategory
}) => {

  return <div className={`${!inputText ? 'bg-[var(--bg-component)] mb-2 rounded-lg shadow-md py-1' : ''} `}>
    {!inputText && (
      <Title isEdit={isEdit} handleEditCategory={handleEditCategory} category={category} items={items} isOpen={isOpen} onToggle={onToggle} handleDeleteCategory={handleDeleteCategory} />
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
  isEdit = false,
  handleDelete = () => {},
  handleDeleteCategory = () => {},
  getCategory = () => {}
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [editCategory, setEditCategory] = useState(false);

  const handleEditCategory = (category, e)=> {
    e?.stopPropagation()
    setEditCategory(category)
    setOpenModal(true)
  }

  const listagem = useMemo(() => {
    const calculatedList = [];

    if (!_category || !_category.all) {
      return calculatedList;
    }

    const categorySort = _category.all.sort((a, b) => {
      return a.type.localeCompare(b.type);
    });

    const itemIdsCategorized = new Set();

    categorySort.forEach((category) => {
      const itemsFiltrados = items.filter((i) => i.category?._id === category._id);
      calculatedList.push({ category: category, items: itemsFiltrados });

      itemsFiltrados.forEach(item => itemIdsCategorized.add(item._id));
    });

    const itemsSemCategoria = items.filter((item) =>
      !item.category?._id || !itemIdsCategorized.has(item._id)
    );

    if (itemsSemCategoria.length > 0) {
      calculatedList.unshift({
        category: {
          _id: 'no-category',
          type: 'Sem Categoria',
          enable: true
        },
        items: itemsSemCategoria
      });
    }

    return calculatedList;
  }, [items, inputText, _category.all]);

  useEffect(() => {
    if (inputText) {
      setOpenType(null);
    }
  }, [inputText]);
  console.log(listagem)
  return (
    <div>
      {listagem.map(({ category, items }, i) => {
        if(!category.enable && !isEdit) {
          return null
        }

        return(
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
            handleDeleteCategory={handleDeleteCategory}
            handleEditCategory={handleEditCategory}
          />
        </div>
      )
      })}
      <CenterTop
        notCloseBg
        showX
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      >
        <FormComponentCategory category={editCategory} handleOnClick={getCategory} />
      </CenterTop>
    </div>
  );
}


