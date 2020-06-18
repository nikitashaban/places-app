import React from "react";
import { Link } from "react-router-dom";

import styles from "./style.module.scss";

interface ButtonProps {
  href?: string;
  size?: string;
  exact?: any;
  inverse?: boolean;
  to?: string;
  danger?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button: React.FC<ButtonProps> = ({
  href,
  size,
  inverse,
  children,
  to,
  exact,
  danger,
  type,
  onClick,
  disabled,
}) => {
  if (href) {
    return (
      <a
        className={`${styles.button} button${size || "default"} ${
          inverse && styles.buttonInverse
        } ${danger && styles.buttonDanger}`}
        href={href}
      >
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link
        to={to}
        className={`${styles.button} ${inverse && styles.buttonInverse} ${
          danger && styles.buttonDanger
        }`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`${styles.button} button--${size || "default"} ${
        inverse && styles.buttonInverse
      } ${danger && styles.buttonDanger}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
