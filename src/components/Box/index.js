export const Box = ({children}) => (
  <div
    className="flex mt-1 w-full border-1 border-[var(--bg-subTitle)] opacity-0 animate-fade-in flex-col rounded-2xl gap-4 shadow-lg p-4 mb-4 relative font-normal"
    style={{
      animationDelay: `${0.01}s`,
      animationFillMode: "forwards",
    }}
  >{children}</div>
);
