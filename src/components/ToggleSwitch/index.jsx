import React, { useState } from 'react';

/**
 * Componente Toggle/Switch customizado com React e Tailwind CSS.
 * * @param {boolean} initialChecked - Estado inicial do toggle.
 * @param {function} onChange - Função a ser chamada quando o estado muda.
 * @param {string} label - Rótulo opcional para o toggle.
 */
export const ToggleSwitch = ({ initialChecked, onChange, label }) => {

  const handleToggle = () => {
    const newState = !initialChecked;
    onChange(newState);
  };

  const backgroundClass = initialChecked ? 'bg-[var(--button-default)]' : 'bg-gray-300';
  const sliderTranslate = initialChecked ? 'translate-x-full' : 'translate-x-0';

  return (
    <div className="flex items-center space-x-3 bg-">
      {/* Container principal do switch, que funciona como o botão de clique */}
      <div
        onClick={handleToggle}
        // Aplica classes de tamanho, bordas e cursor
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out ${backgroundClass}`}
      >
        {/* O "botão" (slider) que se move */}
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform ${sliderTranslate} transition-transform duration-300 ease-in-out`}
        ></div>
      </div>

      {/* Rótulo opcional para o switch */}
      {label && (
        <span className="text-gray-700 select-none">
          {label}
        </span>
      )}
    </div>
  );
};
