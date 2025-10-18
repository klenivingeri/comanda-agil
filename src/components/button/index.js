import React from "react";
import { useConfig } from "../../app/context/ConfigContext";
import { Button } from "./Button";

export const ButtonContainer = ({
  text,
  href,
  type,
  onClick,
  children,
  wFull,
  hFull,
  margin,
  padding,
  disabled,
  press,
  inline,
  style,
}) => {
  const { _config } = useConfig();
  return (
    <Button
      text={text}
      href={href}
      type={type}
      onClick={onClick}
      wFull={wFull}
      hFull={hFull}
      margin={margin}
      padding={padding}
      disabled={disabled}
      press={press}
      inline={inline}
      style={style}
      _config={_config}
    >
      {children}
    </Button>
  );
};
