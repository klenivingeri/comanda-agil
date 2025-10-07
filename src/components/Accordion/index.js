// Accordion.jsx
import { useState, useRef, useEffect } from "react";

export function Accordion({ children, defaultOpenId = null }) {
  const [openId, setOpenId] = useState(defaultOpenId);

  return (
    <div className="space-y-2">
      {children.map((child) =>
        // clona o elemento e injeta as props necessárias
        // garantindo que só um item esteja aberto
        child.props.id
          ? {
              ...child,
              props: {
                ...child.props,
                open: child.props.id === openId,
                onToggle: () =>
                  setOpenId(openId === child.props.id ? null : child.props.id),
              },
            }
          : child
      )}
    </div>
  );
}

export function AccordionItem({ id, title, children, open, onToggle }) {
  const contentRef = useRef(null);
  const [maxH, setMaxH] = useState(open ? "none" : "0px");

  useEffect(() => {
    if (!contentRef.current) return;

    const scrollH = contentRef.current.scrollHeight;

    if (open) {
      // primeiro define a altura real pra animar a abertura
      setMaxH(`${scrollH}px`);

      // depois de terminar a animação, define como "none" pra não limitar o conteúdo
      const timer = setTimeout(() => {
        setMaxH("none");
      }, 300);

      return () => clearTimeout(timer);
    } else {
      // se estiver fechando, garante que antes de animar, a altura volte a um valor fixo
      setMaxH(`${scrollH}px`);
      requestAnimationFrame(() => setMaxH("0px"));
    }
  }, [open, children]);

  return (
    <div className="border rounded-lg overflow-hidden w-full">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
      >
        <span className="text-sm font-medium">{title}</span>

        <svg
          className={`w-5 h-5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 8l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        ref={contentRef}
        style={{
          maxHeight: maxH,
          transition: "max-height 300ms ease",
        }}
        className="px-4 overflow-hidden bg-gray-50"
      >
        <div className="py-3 text-sm text-gray-700">{children}</div>
      </div>
    </div>
  );
}
