export const Content = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <div>
        <p>Carregando conteudo;</p>
      </div>
    );
  }
  return <div className="bg-white rounded p-2">{children}</div>;
};
