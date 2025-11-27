import { IconX } from "public/icons/X";

export function CenterTop({ isOpen, onClose, children, notCloseBg = false, showX = false }) {
  const onClosebg = notCloseBg ? () => { } : onClose
  return (
    isOpen && (
      <>
        {/* Overlay: Permanece o mesmo, apenas garante que o z-index seja menor que o modal */}
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 ${
            // Z-index 40
            isOpen ? "opacity-100" : "opacity-0 hidden pointer-events-none"
            }`}
          onClick={onClosebg}
        ></div>

        {/* Modal Container: Centraliza o conteúdo (usando Flexbox) */}
        <div
          className={`fixed inset-0 z-50 flex items-center mb-20 justify-center pointer-events-none ${isOpen ? "visible" : "hidden pointer-events-none"
            }`} // Z-index 50
        >
          {/* Modal Content: O conteúdo real do modal com transição e largura */}
          <div
            className={`bg-[var(--bg-component)] relative shadow-2xl rounded-lg w-10/12 max-w-sm 
              transition-all duration-300 ease-in-out pointer-events-auto            ${isOpen
                ? "opacity-100 scale-100 translate-y-0" // Aberto: visível e na posição
                : "opacity-0 scale-95 translate-y-4" // Fechado: invisível, menor e ligeiramente para baixo
              }`}
          >

            <div className="p-4">{children}</div>
            {showX && (
              <div
                className="absolute left-1/2 transform -translate-x-1/2 shadow-2xl rounded-lg"
                onClick={onClose}
              >
                <div className="flex w-fit mt-10 items-center justify-center text-white">
                  <IconX size="h-[34px] w-[34px]" />
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    )
  );
}