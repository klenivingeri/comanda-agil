import { CORES_FIXAS } from "src/app/utils/constants";

export const Ranking = ({ data }) => {
  return data.map((category, i) => (
    <div
      key={i}
      className="grid grid-cols-12 mb-2 opacity-0 animate-fade-in"
      style={{
        animationDelay: `${i * 0.1}s`, // ⏱️ cada item atrasa 0.2s a mais
        animationFillMode: "forwards",
      }}
    >
      <div className="flex col-span-4 justify-end items-center mr-2 whitespace-nowrap">
        {category.name}
      </div>
      <div className="col-span-7">
        <div
          className="rounded-r-full transition-all duration-700 ease-out"
          style={{
            background: CORES_FIXAS[i],
            width: `${(category.totalQuantity / data[0].totalQuantity) * 100}%`,
            minWidth: "fit-content",
          }}
        >
          <div className="whitespace-nowrap px-2">{category.totalQuantity}</div>
        </div>
      </div>
    </div>
  ));
};