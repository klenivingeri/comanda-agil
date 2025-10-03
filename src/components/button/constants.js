const buttonOrange = ({ wFull, isPressed, press, disabled }) => `
  relative text-white font-bold rounded-md shadow-sm
  ${!wFull ? "w-full" : wFull}
  ${
    disabled
      ? "bg-[var(--button-orange-disabled)] border-b-4 border-b-[var(--button-progress)]"
      : `
  ${
    isPressed || press
      ? "bg-[var(--button-orange-hover)] border-b-2 border-b-[var(--button-orange-focus)] cursor-pointer"
      : "bg-[var(--button-orange-default)] border-b-4 border-b-[var(--button-orange-focus)] cursor-pointer"
  }
  transition-all duration-70 ease-in-out`
  }
`;

const buttonDefault = ({ wFull, isPressed, press, disabled }) => `
  relative text-white font-bold rounded-md shadow-sm
  ${!wFull ? "w-full" : wFull}
  ${
    disabled
      ? "bg-[var(--button-disabled)] border-b-4 border-b-[var(--button-progress)]"
      : `
  ${
    isPressed || press
      ? "bg-[var(--button-hover)] border-b-2 border-b-[var(--button-focus)] cursor-pointer"
      : "bg-[var(--button-default)] border-b-4 border-b-[var(--button-focus)] cursor-pointer"
  }
  transition-all duration-70 ease-in-out`
  }
`;

const buttonRed = ({ wFull, isPressed, press, disabled }) => `
  relative text-white font-bold rounded-md shadow-sm
  ${!wFull ? "w-full" : wFull}
  ${
    disabled
      ? "bg-[var(--button-red-disabled)] border-b-4 border-b-[var(--button-red-progress)]"
      : `
  ${
    isPressed || press
      ? "bg-[var(--button-red-hover)] border-b-2 border-b-[var(--button-red-focus)] cursor-pointer"
      : "bg-[var(--button-red-default)] border-b-4 border-b-[var(--button-red-focus)] cursor-pointer"
  }
  transition-all duration-70 ease-in-out`
  }
`;

const buttonStyles = {
  buttonDefault,
  buttonOrange,
  buttonRed,
};

export const getButtonStyles = ({ style, wFull, isPressed, press, disabled }) =>
  buttonStyles[style]({ wFull, isPressed, press, disabled });
