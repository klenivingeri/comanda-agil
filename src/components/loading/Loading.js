"use client";

import React, { useState, useEffect } from "react";
import "./loading.css";

const AnimatedTextActiveChar = ({
  defaultColor = "white",
  activeColor = "black",
  text = "Olá, mundo!",
  defaultSize = 22, // em px
  activeScale = 1.5, // multiplicador do tamanho
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev >= text.length - 1 ? -1 : prev + 1));
    }, 500);

    return () => clearInterval(interval);
  }, [text.length]);

  return (
    <span
      style={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="bg-black/30 rounded-3xl px-2"
    >
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`${
            index === activeIndex ? "font-bold" : ""
          } tracking-wide`}
          style={{
            color: index <= activeIndex ? defaultColor : defaultColor,
            fontSize: `${defaultSize}px`,
            display: "inline-block",
            transform:
              index === activeIndex ? `scale(${activeScale})` : "scale(1)",
            transition: "transform 0.3s ease, color 0.3s ease",
            lineHeight: 1, // mantém o alinhamento vertical

            padding: "10px 0 10px 0",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

const AnimatedText = ({
  defaultColor = "white",
  activeColor = "red",
  text = "Olá, mundo!",
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev >= text.length - 1) {
          return -1; // reset
        }
        return prev + 1;
      });
    }, 500); // 3 segundos

    return () => clearInterval(interval);
  }, [text.length]);

  return (
    <span>
      {text.split("").map((char, index) => (
        <span
          key={index}
          style={{ color: index <= activeIndex ? activeColor : defaultColor }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

const LoadingDots = ({ color = "silver", size = 16, speed = 0.3 }) => {
  const dotStyle = {
    width: `${size}px`,
    height: `${size}px`,
    margin: `0 ${size / 2}px`,
    borderRadius: "50%",
    backgroundColor: color,
    display: "inline-block",
    animation: `bounce ${speed}s infinite alternate`,
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        height: `${size * 2}px`,
      }}
    >
      <span style={{ ...dotStyle, animationDelay: "0s" }}></span>
      <span style={{ ...dotStyle, animationDelay: `${speed / 3}s` }}></span>
      <span
        style={{ ...dotStyle, animationDelay: `${(speed / 3) * 2}s` }}
      ></span>

      {/* CSS keyframes */}
      <style>
        {`
          @keyframes bounce {
            0% { transform: translateY(0); }
            100% { transform: translateY(-200%); }
          }
        `}
      </style>
    </div>
  );
};

const Circle = () => {
  return (
    <div className="pl-1 rounded-full w-[70px] h-[70px] flex justify-center items-center">
      <div id="loader" className="spinner"></div>;
    </div>
  );
};

const LoadingDotsButton = ({ color, size, speed }) => {
  const dotStyle = {
    width: `${size}px`,
    height: `${size}px`,
    margin: `0 ${size / 2}px`,
    borderRadius: "50%",
    backgroundColor: color,
    display: "inline-block",
    animation: `bounce ${speed}s infinite alternate`,
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        height: `${size * 3}px`,
      }}
    >
      <span style={{ ...dotStyle, animationDelay: "0s" }}></span>
      <span style={{ ...dotStyle, animationDelay: `${speed / 3}s` }}></span>
      <span
        style={{ ...dotStyle, animationDelay: `${(speed / 3) * 2}s` }}
      ></span>

      {/* CSS keyframes */}
      <style>
        {`
          @keyframes bounce {
            0% { transform: translateY(0); }
            100% { transform: translateY(-200%); }
          }
        `}
      </style>
    </div>
  );
};

const LOADING_STYLE = {
  style1: AnimatedTextActiveChar,
  style2: AnimatedText,
  style3: Circle,
  style4: LoadingDots,
  style5: LoadingDotsButton,
};

export const Loading = ({
  isLoading,
  style = "style4",
  color = "silver",
  size = 16,
  speed = 0.3,
}) => {
  const ComponentLoading = LOADING_STYLE[style];
  return (
    isLoading && (
      <div className="flex justify-center items-center">
        <ComponentLoading
          text="Criando&nbsp;comanda!"
          color={color}
          size={size}
          speed={speed}
        />
      </div>
    )
  );
};
