import React from "react";
export function SideModal({ isOpen, onClose, children }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-20
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      ></div>

      {/* Modal lateral */}
      <div
        className={`fixed top-0 right-0
          transition-transform duration-500 ease-in-out z-30
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="">{children}</div>
      </div>
    </>
  );
}
