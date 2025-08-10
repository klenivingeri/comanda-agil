"use client";
import { Item } from "./Item";
import { SubItems } from "./SubItems";

export const ItemList = ({ items, inputText }) => {
  return (
    <div className="h-full w-full">
      {inputText ? (
        <div className="">
          {items
            .filter((i) =>
              `${i.id} - ${i.name}`
                .toLowerCase()
                .includes(inputText.toLowerCase())
            )
            .map((item, idx) => (
              <Item key={idx} item={item} />
            ))}
        </div>
      ) : (
        <SubItems items={items} />
      )}
    </div>
  );
};
