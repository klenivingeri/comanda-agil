const buttonOrange = ({ wFull, isPressed, press, disabled }) => `
  relative text-white font-bold rounded-lg shadow-sm
  ${!wFull ? "w-full" : wFull}
  ${
    disabled
      ? "bg-[var(--button-orange-disabled)] border-b-3 border-b-[var(--button-orange-progress)]"
      : `
  ${
    isPressed || press
      ? "bg-[var(--button-orange-hover)] border-1 border-[var(--button-orange-hover)] border-b-1 border-b-[var(--button-orange-focus)] cursor-pointer"
      : "bg-gradient-to-br from-[var(--button-orange-hover)] to-[var(--button-orange-default)] border-1 border-[var(--button-orange-default)] hover:bg-[var(--button-orange-hover)] border-b-3 border-b-[var(--button-orange-default)] cursor-pointer"
  }
  transition-all duration-70 ease-in-out`
  }
`;

const buttonBlue = ({ wFull, isPressed, press, disabled }) => `
  relative text-white font-bold rounded-lg shadow-sm
  ${!wFull ? "w-full" : wFull}
  ${
    disabled
      ? "bg-[var(--button-blue-disabled)] border-b-3 border-b-[var(--button-blue-progress)]"
      : `
  ${
    isPressed || press
      ? "bg-[var(--button-blue-hover)] border-1 border-[var(--button-blue-hover)] border-b-1 border-b-[var(--button-blue-focus)] cursor-pointer"
      : "bg-gradient-to-br from-[var(--button-blue-hover)] to-[var(--button-blue-default)] border-1 border-[var(--button-blue-default)] hover:bg-[var(--button-blue-hover)] border-b-3 border-b-[var(--button-blue-default)] cursor-pointer"
  }
  transition-all duration-70 ease-in-out`
  }
`;

const buttonGreen = ({ wFull, isPressed, press, disabled }) => `
  relative text-white font-bold rounded-lg shadow-sm
  ${!wFull ? "w-full" : wFull}
  ${
    disabled
      ? "bg-[var(--button-green-disabled)] border-b-3 border-b-[var(--button-green-progress)]"
      : `
  ${
    isPressed || press
      ? "bg-[var(--button-green-hover)] border-1 border-[var(--button-green-hover)] border-b-1 border-b-[var(--button-green-focus)] cursor-pointer"
      : "bg-gradient-to-br from-[var(--button-green-hover)] to-[var(--button-green-default)] border-1 border-[var(--button-green-default)] hover:bg-[var(--button-green-hover)] border-b-3 border-b-[var(--button-green-default)] cursor-pointer"
  }
  transition-all duration-70 ease-in-out`
  }
`;

const buttonRed = ({ wFull, isPressed, press, disabled }) => `
  relative text-white font-bold rounded-lg shadow-sm
  ${!wFull ? "w-full" : wFull}
  ${
    disabled
      ? "bg-[var(--button-red-disabled)] border-b-3 border-b-[var(--button-red-progress)]"
      : `
  ${
    isPressed || press
      ? "bg-[var(--button-red-hover)] border-1 border-[var(--button-red-hover)] border-b-1 border-b-[var(--button-red-focus)] cursor-pointer"
      : "bg-gradient-to-br from-[var(--button-red-hover)] to-[var(--button-red-default)] border-1 border-[var(--button-red-default)] hover:bg-[var(--button-red-hover)] border-b-3 border-b-[var(--button-red-default)] cursor-pointer"
  }
  transition-all duration-70 ease-in-out`
  }
`;

const buttonDefault = ({ wFull, isPressed, press, disabled }) => `
  relative font-bold rounded-lg shadow-sm
  ${!wFull ? "w-full" : wFull}
  ${
    disabled
      ? " border-1 border-b-3 border-[var(--button-default)]/40 text-[var(--button-default)]/40"
      : `
  ${
    isPressed || press
      ? "text-white bg-[var(--button-default)] border-1 border-[var(--button-default)] border-b-1 border-b-[var(--button-default)] cursor-pointer"
      : "text-white bg-gradient-to-br from-[var(--button-hover)] to-[var(--button-default)] border-1 border-[var(--button-default)] hover:bg-[var(--button-default)] border-b-3 border-b-[var(--button-default)] cursor-pointer"
  }
  transition-all duration-70 ease-in-out`
  }
`;

const buttonInline = ({ wFull, isPressed, press, disabled }) => `
  relative  shadow-sm font-bold rounded-lg pt-[1px]
  ${!wFull ? "w-full" : wFull}
  ${
    disabled
      ? "border-1 border-b-3 border-[var(--button-default)]/40 text-[var(--button-default)]/40"
      : `
  ${
    isPressed || press
      ? "bg-[var(--button-default)] text-white border-1-transparent border-b-3 border-b-[var(--button-default)] cursor-pointer"
      : "text-[var(--button-default)] border-1 border-b-2 border-[var(--button-default)] border-b-[var(--button-default)] cursor-pointer"
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
