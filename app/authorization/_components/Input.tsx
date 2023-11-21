import { ChangeEvent, InputHTMLAttributes } from "react";

export type variant = "name" | "email" | "password";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  config: [
    variant: variant,
    onChange: (event: ChangeEvent<HTMLInputElement>, variant: variant) => void,
  ];
}

const variantPlaceholders = (variant: variant) => {
  return variant.charAt(0).toUpperCase() + variant.slice(1);
};

export const Input = (props: InputProps) => {
  const { config, className, ...other } = props;
  const [variant, onChange] = config;

  return (
    <input
      type={variant}
      name={variant}
      onChange={(event) => {
        onChange(event, variant);
      }}
      placeholder={variantPlaceholders(variant)}
      className={`focus:outline-none ${className}`}
      autoComplete="off"
      {...other}
    />
  );
};
