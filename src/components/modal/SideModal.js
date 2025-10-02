import React from "react";

export function SideModal({ isOpen, onClose, children }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 transition-opacity duration-100 z-20
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      ></div>

      <div
        className={`fixed top-0 left-0
          transition-transform duration-100 ease-in-out z-30
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="">{children}</div>
      </div>
    </>
  );
}
