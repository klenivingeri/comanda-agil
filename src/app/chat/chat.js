"use client";
import React, { Suspense } from "react";

export const Chat = () => {
  const addMessageToConversation = ({ e }) => {
    e.preventDefault();
    // aqui entra sua lógica de envio de mensagem
  };

  return (
    <Suspense>
      <div className="flex flex-col h-screen w-screen pt-[60px]">
        {/* Topo */}
        <div className="bg-[#075e54] flex flex-row justify-between text-white px-2 pt-2 pb-1 w-screen fixed top-0 z-10">
          <div className="flex flex-row">{/* Conteúdo topo */}</div>
        </div>

        {/* Mensagens */}
        <div className="flex-1 overflow-y-auto p-2">{/* mensagens aqui */}</div>

        {/* Rodapé */}
        <div className="flex flex-row items-center p-2 sticky bottom-0 z-10">
          <form
            className="flex flex-1 flex-row items-center"
            onSubmit={(e) => addMessageToConversation({ e })}
          >
            {/* Caixa do input */}
            <div className="bg-white rounded-full px-2 flex flex-row items-center w-full">
              <input
                className="h-[45px] w-full px-2 border-none rounded-full text-[16px] outline-none"
                type="text"
                placeholder="Digite sua mensagem..."
                name="text"
              />
            </div>

            {/* Botão enviar */}
            <ButtonContainer
              className="flex justify-center items-center bg-[#075e54] rounded-full w-[54px] h-[48px] ml-2"
              type="submit"
            >
              {/* Ícone pode ir aqui */}
            </ButtonContainer>
          </form>
        </div>
      </div>
    </Suspense>
  );
};
