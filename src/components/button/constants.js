const buttonOrange = ({ wFull, isPressed, press, disabled }) => `
  relative text-white font-bold rounded-md shadow-sm
  ${!wFull ? "w-full" : wFull}
  ${
    disabled
      ? "bg-[var(--button-orange-disabled)] border-b-3 border-b-[var(--button-orange-progress)]"
      : `
  ${
    isPressed || press
      ? "bg-[var(--button-orange-hover)] border-1 border-[var(--button-orange-hover)] border-b-2 border-b-[var(--button-orange-focus)] cursor-pointer"
      : "bg-[var(--button-orange-default)] border-1 border-[var(--button-orange-default)] border-b-3 border-b-[var(--button-orange-focus)] cursor-pointer"
  }
  transition-all duration-70 ease-in-out`
  }
`;

const buttonBlue = ({ wFull, isPressed, press, disabled }) => `
  relative text-white font-bold rounded-md shadow-sm
  ${!wFull ? "w-full" : wFull}
  ${
    disabled
      ? "bg-[var(--button-blue-disabled)] border-b-3 border-b-[var(--button-blue-progress)]"
      : `
  ${
    isPressed || press
      ? "bg-[var(--button-blue-hover)] border-1 border-[var(--button-blue-hover)] border-b-2 border-b-[var(--button-blue-focus)] cursor-pointer"
      : "bg-[var(--button-blue-default)] border-1 border-[var(--button-blue-default)] border-b-3 border-b-[var(--button-blue-focus)] cursor-pointer"
  }
  transition-all duration-70 ease-in-out`
  }
`;

const buttonGreen = ({ wFull, isPressed, press, disabled }) => `
  relative text-white font-bold rounded-md shadow-sm
  ${!wFull ? "w-full" : wFull}
  ${
    disabled
      ? "bg-[var(--button-green-disabled)] border-b-3 border-b-[var(--button-green-progress)]"
      : `
  ${
    isPressed || press
      ? "bg-[var(--button-green-hover)] border-1 border-[var(--button-green-hover)] border-b-2 border-b-[var(--button-green-focus)] cursor-pointer"
      : "bg-[var(--button-green-default)] border-1 border-[var(--button-green-default)] border-b-3 border-b-[var(--button-green-focus)] cursor-pointer"
  }
  transition-all duration-70 ease-in-out`
  }
`;

const buttonRed = ({ wFull, isPressed, press, disabled }) => `
  relative text-white font-bold rounded-md shadow-sm
  ${!wFull ? "w-full" : wFull}
  ${
    disabled
      ? "bg-[var(--button-red-disabled)] border-b-3 border-b-[var(--button-red-progress)]"
      : `
  ${
    isPressed || press
      ? "bg-[var(--button-red-hover)] border-1 border-[var(--button-red-hover)] border-b-2 border-b-[var(--button-red-focus)] cursor-pointer"
      : "bg-[var(--button-red-default)] border-1 border-[var(--button-red-default)] border-b-3 border-b-[var(--button-red-focus)] cursor-pointer"
  }
  transition-all duration-70 ease-in-out`
  }
`;

const buttonDefault = ({ wFull, isPressed, press, disabled }) => `
  relative text-white font-bold rounded-md shadow-sm
  ${!wFull ? "w-full" : wFull}
  ${
    disabled
      ? "bg-[var(--button-disabled)] border-1 border-b-3 border-b-[var(--button-progress)]"
      : `
  ${
    isPressed || press
      ? "bg-[var(--button-hover)] border-1 border-[var(--button-hover)] border-b-2 border-b-[var(--button-focus)] cursor-pointer"
      : "bg-[var(--button-default)] border-1 border-[var(--button-default)] border-b-3 border-b-[var(--button-focus)] cursor-pointer"
  }
  transition-all duration-70 ease-in-out`
  }
`;

const buttonInline = ({ wFull, isPressed, press, disabled }) => `
  relative text-[var(--text-default)] rounded-md shadow-sm
  ${!wFull ? "w-full" : wFull}
  ${
    disabled
      ? "border-1 border-b-3 border-[var(--button-progress)]"
      : `
  ${
    isPressed || press
      ? "border-1 border-b-2 border-[var(--button-progress)] cursor-pointer"
      : "border-1 border-b-3 border-[var(--button-progress)] border-b-[var(--button-progress)] cursor-pointer"
  }
  transition-all duration-70 ease-in-out`
  }
`;

const buttonStyles = {
  buttonDefault,
  buttonOrange,
  buttonInline,
  buttonGreen,
  buttonBlue,
  buttonRed,
};

export const getButtonStyles = ({ style, wFull, isPressed, press, disabled }) =>
  buttonStyles[style]({ wFull, isPressed, press, disabled });
