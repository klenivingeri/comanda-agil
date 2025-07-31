export const Footer = ({ children }) => {
  return (
    <div id="Footer" className="fixed inset-x-0 bottom-0 w-full z-50">
      <div className="flex justify-center">
        <div className="flex w-full md:max-w-[768px] shadow-lg bg-amber-400 h-[50px]">
          {children}
        </div>
      </div>
    </div>
  );
};
