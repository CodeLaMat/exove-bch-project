import React, { ButtonHTMLAttributes } from "react";
import classes from "./Button.module.css";

interface ButtonProps {
  variant: "primary" | "secondary" | "alert" | "standard";
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

class Button extends React.Component<ButtonProps> {
  render() {
    const {
      children,
      variant,
      className,
      type = "button",
      ...rest
    } = this.props;

    const variantClassName = classes[`Button-${variant}`];
    const classNames = [classes.Button, variantClassName];

    if (className) {
      classNames.push(className);
    }

    return (
      <button className={classNames.join(" ")} type={type} {...rest}>
        {children}
      </button>
    );
  }
}

export default Button;
