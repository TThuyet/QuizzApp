import React from "react";

interface IButton {
  border?: string;
  color?: string;
  children?: React.ReactNode;
  height?: string;
  radius?: string;
  width?: string;
  onClick?: () => void;
}
// : React.FC<IButton>
const Button = ({
  border,
  color,
  children,
  height,
  radius,
  width,
  onClick,
}: IButton) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: color,
        border,
        borderRadius: radius,
        height,
        width,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
