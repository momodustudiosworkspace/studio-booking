import React, { forwardRef } from "react";
import clsx from "clsx";

interface ButtonProps {
  text: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  variant?: "primary" | "secondary" | "outline" | "white" | "danger";
  size?: "sm" | "md" | "lg";
  responsiveSize?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      icon,
      responsiveSize,
      className,
      disabled,
      loading,
      iconPosition = "left",
      variant = "primary",
      size = "md",
      onClick,
    },
    ref
  ): React.JSX.Element => {
    const base =
      "inline-flex items-center font-medium rounded-full transition-colors duration-200";
    const variantClasses = {
      primary: "bg-black text-white hover:bg-gray-800",
      secondary: "bg-white text-black border border-black hover:bg-gray-100",
      outline:
        "bg-transparent text-black border border-black hover:bg-black hover:text-white",
      white: "bg-white text-black",
      danger: "bg-red-600 text-white"
    };
    const sizeClasses = {
      sm: "p-2 pl-3 text-sm",
      md: "px-3 py-3 text-base",
      lg: "px-4 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        className={clsx(
          base,
          variantClasses[variant],
          sizeClasses[size],
          responsiveSize,
          disabled ? "cursor-not-allowed opacity-50" : "hover:opacity-90",
          className
        )}
      >
        {icon && iconPosition === "left" && (
          <span className='mr-2'>{icon}</span>
        )}
        {text}
        {icon &&
          iconPosition === "right" &&
          (loading ? (
            <div className='ml-2 h-4 w-4 animate-spin rounded-full border-4 border-white border-t-transparent'></div>
          ) : (
            <span className='ml-2'>{icon}</span>
          ))}
      </button>
    );
  }
);

Button.displayName = "Button"; // required for forwardRef

export default Button;
