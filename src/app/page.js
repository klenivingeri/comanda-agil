import Link from "next/link";
import React from "react";

const ComandaGoLanding = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold tracking-tight">
              <span className="text-gray-900">Comanda</span>
              <span className="text-[var(--button-orange-default)]">Go</span>
              <p className="text-xs font-normal text-gray-500 mt-1">
                Gestão de Pedidos Simplificada
              </p>
            </div>

            <nav className="hidden md:flex space-x-6 items-center">
              <Link
                href="#quem-somos"
                className="text-gray-600 hover:text-yellow-600 transition duration-150 ease-in-out"
              >
                Quem Somos
              </Link>
              <Link
                href="#contatos"
                className="text-gray-600 hover:text-yellow-600 transition duration-150 ease-in-out"
              >
                Contatos
              </Link>
              <Link
                href="/login"
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-[var(--button-orange-default)] transition duration-150 ease-in-out shadow-lg"
              >
                Entrar
              </Link>
            </nav>

            <div className="md:hidden">
              <Link
                href="/login"
                className="px-8 py-3 text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-[var(--button-orange-default)] shadow-lg"
              >
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="py-16 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center tracking-tigh">
            <h1 className="text-5xl mb-8 sm:text-6xl font-semibold text-gray-900 leading-tight">
              Revolucione a
              <span className="text-[var(--button-orange-default)]">
                 Gestão 
              </span>
              do seu Restaurante
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto tracking-tight">
              ComandaGo é a solução definitiva para <strong>simplificar</strong>{" "}
              o trabalho dos seus colaboradores, <strong>organizar</strong> suas
              mesas e garantir o <strong>controle total</strong> do seu negócio.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="/demonstracao"
                className="w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[var(--button-orange-default)] hover:[var(--button-orange-hover)] md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out shadow-xl"
              >
                Agendar Demonstração Gratuita
              </a>
              <a
                href="#quem-somos"
                className="w-full sm:w-auto px-8 py-3 border-2 border-[var(--button-orange-default)] text-base font-medium rounded-md text-[var(--button-orange-default)] bg-white hover:bg-yellow-50 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out shadow-md"
              >
                Saiba Mais
              </a>
            </div>
          </div>
        </div>

        {/* 💡 Seção Quem Somos */}
        <section
          id="quem-somos"
          className="py-16 bg-white border-t border-gray-200"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
              Quem Somos
            </h2>
            <p className="text-lg text-gray-600 mb-4 tracking-tight">
              Nascemos da necessidade de modernizar a gestão em estabelecimentos
              de food service. A <strong>ComandaGo</strong> foi criada por
              empreendedores que entendem os desafios da rotina de bares,
              restaurantes e lanchonetes.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              Nosso foco é oferecer uma ferramenta
              <strong>  simples, intuitiva e poderos</strong> que elimina o uso
              de papel, reduz erros em pedidos e agiliza o atendimento. Com
              nosso PDV, nossos clientes veem um aumento comprovado na
              produtividade e no faturamento.
            </p>
            <ul className="mt-6  text-lg text-gray-600">
              <li className="">
                <span className="text-[var(--button-orange-default)] mr-2 font-bold">
                  ✓
                </span>
                <b className="font-semibold">Gestão Completa:</b> Controle
                pedidos e caixa em um só lugar.
              </li>
              <li className="">
                <span className="text-[var(--button-orange-default)] mr-2 font-bold">
                  ✓
                </span>
                <b className="font-semibold">Agilidade:</b> Seus colaboradores
                enviam pedidos diretamente do celular, tablet ou computador.
              </li>
              <li className="">
                <span className="text-[var(--button-orange-default)] mr-2 font-bold">
                  ✓
                </span>
                <b className="font-semibold">Relatórios:</b> Acompanhe as
                vendas, pedidos, categorias e colaboradores, tudo em dados
                claros e simples.
              </li>
              <li className="">
                <span className="text-[var(--button-orange-default)] mr-2 font-bold">
                  ✓
                </span>
                <b className="font-semibold">Gamificação:</b> Motive sua equipe
                com metas e rankings de desempenho.
              </li>

              <li className="">
                <span className="text-[var(--button-orange-default)] mr-2 font-bold">
                  ✓
                </span>
                <b className="font-semibold">Facilidade:</b> Clientes podem
                visualizar a comandas para tirar duvidas, e acessar o cardapio
                pra conhecer as opções.
              </li>
              <li className="">
                <span className="text-[var(--button-orange-default)] mr-2 font-bold">
                  ✓
                </span>
                <b className="font-semibold">Zero Erros:</b> Pedidos claros e
                sem rasuras, aumentando a satisfação do cliente.
              </li>
            </ul>
          </div>
        </section>

        <section
          id="contatos"
          className="py-16 bg-gray-50 border-t border-gray-200"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Fale Conosco
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Tem alguma dúvida, precisa de suporte ou quer agendar uma
              apresentação detalhada? Nossa equipe está pronta para te ajudar a
              dar o próximo passo!
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="w-full sm:w-64 p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  📞 Atendimento Rápido
                </h3>
                <p className="text-[var(--button-orange-default)] font-extrabold text-2xl">
                  (XX) XXXX-XXXX
                </p>
                <a
                  href="https://wa.me/SEUNUMERO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm text-gray-600 hover:text-yellow-600 font-medium"
                >
                  Falar por WhatsApp
                </a>
              </div>
              <div className="w-full sm:w-64 p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  ✉️ E-mail
                </h3>
                <p className="text-[var(--button-orange-default)] font-extrabold text-lg truncate">
                  contato@comandago.com
                </p>
                <a
                  href="mailto:contato@comandago.com"
                  className="mt-3 inline-block text-sm text-gray-600 hover:text-yellow-600 font-medium"
                >
                  Enviar E-mail Agora
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 🦶 Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} ComandaGo. Gestão de Pedidos
            Simplificada. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Exporta o componente para ser usado no seu arquivo principal (ex: App.js ou index.js)
export default ComandaGoLanding;
