export const Content = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <div className="flex bg-white rounded p-2 h-full w-full justify-center items-center">
        <p>Carregando conteudo;</p>
      </div>
    );
  }
  return <div className="bg-white rounded p-2 h-full">{children}</div>;
};
