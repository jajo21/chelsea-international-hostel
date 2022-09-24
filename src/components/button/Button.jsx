import React from "react";
import "./button.css";

function Button({ onClick, children, className }) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
