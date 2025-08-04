export const Container = ({ children }) => {
  return (
    <div className="relative flex h-full w-full flex-col min-h-screen">
      {children}
    </div>
  );
};
