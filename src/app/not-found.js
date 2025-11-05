import Link from 'next/link';

const ComandaGo404 = () => {
  return (
    // Usa o mesmo fundo 'bg-gray-50' da sua landing page
    <div className="min-h-screen font-sans flex flex-col">

      {/* ❌ Conteúdo 404 (Centralizado e Limpo) */}
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-white p-10 rounded-xl shadow-2xl border border-gray-100">
          
          {/* Título Grande (Usa a cor de destaque da sua marca) */}
          <h1 className="text-8xl sm:text-9xl font-extrabold text-yellow-600 mb-4">
            404
          </h1>
          
          {/* Subtítulo */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Página Não Encontrada
          </h2>
          
          {/* Mensagem de Erro */}
          <p className="text-lg text-gray-600 mb-10">
            Desculpe, a URL que você digitou não corresponde a nenhuma página no sistema <strong>ComandaGo</strong>. Verifique o endereço e tente novamente.
          </p>

          {/* Botão Principal de Retorno (Estilo CTA da sua Landing Page) */}
          <Link 
            href="/" 
            className="w-full sm:w-auto inline-block px-10 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 transition duration-150 ease-in-out shadow-xl"
          >
            Voltar para a Página Inicial
          </Link>
          
          {/* Link Secundário (Estilo de botão secundário da sua Landing Page) */}
          <a 
            href="#contatos" 
            className="mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto inline-block px-10 py-3 border border-2 border-gray-400 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 transition duration-150 ease-in-out shadow-md"
          >
            Fale Conosco
          </a>
          
        </div>
      </main>
    </div>
  );
};

export default ComandaGo404;