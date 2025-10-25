import { IconX } from "public/icons/X";

export function CenterTop({ isOpen, onClose, children, notCloseBg = false, showX = false }) {
  const onClosebg = notCloseBg ? () => {} : onClose 
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
          className={`fixed inset-0 z-50 flex items-start mt-6 justify-center pointer-events-none ${
            isOpen ? "visible" : "hidden pointer-events-none"
          }`} // Z-index 50
        >
          {/* Modal Content: O conteúdo real do modal com transição e largura */}
          <div
            className={`bg-[var(--bg-component)] relative shadow-2xl rounded-lg w-10/12 max-w-sm 
            overflow-hidden transition-all duration-300 ease-in-out pointer-events-auto
            ${
              isOpen
                ? "opacity-100 scale-100 translate-y-0" // Aberto: visível e na posição
                : "opacity-0 scale-95 translate-y-4" // Fechado: invisível, menor e ligeiramente para baixo
            }`}
          >
            {showX && <div className="absolute right-0 top-1 mx-2 mt-2 text-[var(--text-default)]" onClick={onClose}><IconX size="h-[32px] w-[32px]" /></div>}
            <div className="p-4">{children}</div>
          </div>
        </div>
      </>
    )
  );
}