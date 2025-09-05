export function BottomModal({ isOpen, onClose, children }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-20 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-white shadow-xl rounded-t-lg 
          overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? "h-40" : "h-0"} z-30`}
      >
        <div className="p-4">{children}</div>
      </div>
    </>
  );
}
