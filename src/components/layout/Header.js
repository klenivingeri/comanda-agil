export const Header = ({ children }) => {
  return (
    <div id="Header" className="fixed inset-x-0 w-full z-50">
      <div className="flex justify-center">
        <div className="flex w-full max-w-[768px] h-[50px] bg-[--background]">
          {children}
        </div>
      </div>
    </div>
  );
};
