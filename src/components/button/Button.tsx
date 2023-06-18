import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => (
  <button {...props} className={classNames(styles.button, className)}>
    {children}
  </button>
);
