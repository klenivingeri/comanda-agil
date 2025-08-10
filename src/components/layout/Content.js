export const Content = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <div className="flex rounded p-2 h-full w-full justify-center items-center">
        <p>Carregando conteudo;</p>
      </div>
    );
  }
  return <div className="grid grid-cols-1 rounded p-2 h-full">{children}</div>;
};
