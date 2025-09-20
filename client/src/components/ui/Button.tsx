import React, { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  text: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right"; // icon position
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  responsiveSize?: string; // e.g., "sm:text-sm md:text-base lg:text-lg"
  onClick: () => void;
  className?: string; // extra custom styles
}

const Button = ({
  text,
  icon,
  iconPosition = "left",
  variant = "primary",
  size = "md",
  responsiveSize,
  onClick,
  className,
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200";

  const variantClasses = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-white text-black border border-black hover:bg-gray-100",
    outline:
      "bg-transparent text-black border border-black hover:bg-black hover:text-white",
  };

  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        base,
        variantClasses[variant],
        sizeClasses[size],
        responsiveSize,
        className
      )}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {text}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
