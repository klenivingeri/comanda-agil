import React from 'react';
// Importa o arquivo CSS onde o Tailwind está configurado.

// Componente principal da Landing Page da ComandaGo
const ComandaGoLanding = () => {
  return (
    // O 'overflow-x-hidden' foi adicionado aqui para garantir que não haja barra de rolagem horizontal.
    <div className="min-h-screen bg-gray-50 font-sans overflow-x-hidden">
      
      {/* 🚀 Header/Navegação */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            
            {/* Logo/Marca */}
            <div className="text-2xl font-bold tracking-tight">
              <span className="text-gray-900">Comanda</span>
              <span className="text-yellow-600">Go</span>
              <p className="text-xs font-normal text-gray-500 mt-1">Gestão de Pedidos Simplificada</p>
            </div>

            {/* Links de Navegação */}
            <nav className="hidden md:flex space-x-6 items-center">
              <a href="#quem-somos" className="text-gray-600 hover:text-yellow-600 transition duration-150 ease-in-out">Quem Somos</a>
              <a href="#contatos" className="text-gray-600 hover:text-yellow-600 transition duration-150 ease-in-out">Contatos</a>
              <a href="/login" className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-yellow-600 transition duration-150 ease-in-out shadow-lg">
                Entrar
              </a>
            </nav>

            {/* Menu responsivo (exemplo simples) */}
            <div className="md:hidden">
                <a href="/login" className="px-8 py-3 text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-yellow-600 shadow-lg">
                    Entrar
                </a>
            </div>
          </div>
        </div>
      </header>

      {/* 🌟 Seção Principal - Hero */}
      <main>
        <div className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
              Revolucione a <span className="text-yellow-600">Gestão</span> do seu Restaurante
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              ComandaGo é a solução definitiva para **simplificar** o trabalho dos seus garçons, **organizar** suas mesas e garantir o **controle total** do seu negócio de alimentação.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="/demonstracao" 
                className="w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out shadow-xl"
              >
                Agendar Demonstração Gratuita
              </a>
              <a 
                href="#quem-somos" 
                className="w-full sm:w-auto px-8 py-3 border border-2 border-yellow-600 text-base font-medium rounded-md text-yellow-600 bg-white hover:bg-yellow-50 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out shadow-md"
              >
                Saiba Mais
              </a>
            </div>
          </div>
        </div>

        {/* 💡 Seção Quem Somos */}
        <section id="quem-somos" className="py-16 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Quem Somos</h2>
            <p className="text-lg text-gray-600 mb-4">
              Nascemos da necessidade de modernizar a gestão em estabelecimentos de food service. A **ComandaGo** foi criada por empreendedores que entendem os desafios da rotina de bares, restaurantes e lanchonetes.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              Nosso foco é oferecer uma ferramenta **simples, intuitiva e poderosa** que elimina o uso de papel, reduz erros em pedidos e agiliza o atendimento. Com nosso PDV e gestão de mesas, nossos clientes veem um aumento comprovado na produtividade e no faturamento.
            </p>
            <ul className="mt-6 space-y-3 text-lg text-gray-600">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2 font-bold">✓</span> **Gestão Completa:** Controle de mesas, pedidos e caixa em um só lugar.
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2 font-bold">✓</span> **Agilidade:** Garçons enviam pedidos diretamente do celular para a cozinha.
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2 font-bold">✓</span> **Zero Erros:** Pedidos claros e sem rasuras, aumentando a satisfação do cliente.
              </li>
            </ul>
          </div>
        </section>

        {/* 📞 Seção Contatos */}
        <section id="contatos" className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Fale Conosco</h2>
            <p className="text-lg text-gray-600 mb-8">
              Tem alguma dúvida, precisa de suporte ou quer agendar uma apresentação detalhada? Nossa equipe está pronta para te ajudar a dar o próximo passo!
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="w-full sm:w-64 p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">📞 Atendimento Rápido</h3>
                <p className="text-yellow-600 font-extrabold text-2xl">(XX) XXXX-XXXX</p>
                <a href="https://wa.me/SEUNUMERO" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-gray-600 hover:text-yellow-600 font-medium">Falar por WhatsApp</a>
              </div>
              <div className="w-full sm:w-64 p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">✉️ E-mail</h3>
                <p className="text-yellow-600 font-extrabold text-lg truncate">contato@comandago.com</p>
                <a href="mailto:contato@comandago.com" className="mt-3 inline-block text-sm text-gray-600 hover:text-yellow-600 font-medium">Enviar E-mail Agora</a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 🦶 Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ComandaGo. Gestão de Pedidos Simplificada. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

// Exporta o componente para ser usado no seu arquivo principal (ex: App.js ou index.js)
export default ComandaGoLanding;