import { CORES_FIXAS } from "src/app/utils/constants";

export const Ranking = ({ data, isProduct = false, colorsMap ={} }) => {
  console.log(data)
  return (
    <div className="my-5">
      {data.map(({ product, totalQuantity }, i) => (
        <div
          key={i}
          className="grid grid-cols-12 mb-2 opacity-0 animate-fade-in px-10"
          style={{
            animationDelay: `${i * 0.05}s`, // ⏱️ cada item atrasa 0.2s a mais
            animationFillMode: "forwards",
          }}
        >
          <div className="col-span-12 flex flex-col">
            <div className="flex text-sm items-center mr-2 whitespace-nowrap">
              {totalQuantity} - {isProduct ? product?.name : product?.category?.name }
            </div>
            <div
              className="rounded-r-full transition-all duration-700 ease-out"
              style={{
                background: colorsMap[product?.category?.name] || CORES_FIXAS[i],
                width: `${(totalQuantity / data[0].totalQuantity) * 100}%`,
                minWidth: "fit-content",
              }}
            >
              <div className="whitespace-nowrap px-2 py-1"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
