import React, { useState } from 'react';

/**
 * Componente Toggle/Switch customizado com React e Tailwind CSS.
 * * @param {boolean} initialChecked - Estado inicial do toggle.
 * @param {function} onChange - Função a ser chamada quando o estado muda.
 * @param {string} label - Rótulo opcional para o toggle.
 */
export const ToggleSwitch = ({ initialChecked = true, onChange, label }) => {
  // 1. Gerencia o estado do switch (true/false)
  const [isChecked, setIsChecked] = useState(initialChecked);
  console.log('aa',initialChecked)
  // 2. Função que lida com a mudança de estado
  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  // Classes dinâmicas do Tailwind
  // Cor de fundo: verde (on) ou cinza (off)
  const backgroundClass = isChecked ? 'bg-[var(--button-default)]' : 'bg-gray-300';
  // Posição do "botão" (slider): move para a direita (on) ou esquerda (off)
  const sliderTranslate = isChecked ? 'translate-x-full' : 'translate-x-0';

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
