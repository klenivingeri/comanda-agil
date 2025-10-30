import { CORES_FIXAS } from "src/app/utils/constants";

export const Ranking = ({ data }) => {
  return data.map(({product, totalQuantity , category}, i) => (
    <div
      key={i}
      className="grid grid-cols-12 mb-2 opacity-0 animate-fade-in px-10"
      style={{
        animationDelay: `${i * 0.1}s`, // ⏱️ cada item atrasa 0.2s a mais
        animationFillMode: "forwards",
      }}
    >

      <div className="col-span-12 flex flex-col">
      <div className="flex text-sm items-center mr-2 whitespace-nowrap">
        {category?.name || product?.name}
      </div>
        <div
          className="rounded-r-full transition-all duration-700 ease-out"
          style={{
            background: CORES_FIXAS[i],
            width: `${(totalQuantity / data[0].totalQuantity) * 100}%`,
            minWidth: "fit-content",
          }}
        >
          <div className="whitespace-nowrap px-2">{totalQuantity}</div>
        </div>
      </div>
    </div>
  ));
};