import clsx from "clsx";
import Link from "next/link";

interface LinkButtonProps {
  href: string;
  text: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  responsiveSize?: string;
  className?: string;
}

export default function LinkButton({
  href,
  text,
  icon,
  iconPosition = "left",
  variant = "primary",
  size = "md",
  responsiveSize,
  className,
}: LinkButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-full transition-colors duration-200";
  const variantClasses = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-white text-black border border-black hover:bg-gray-100",
    outline:
      "bg-transparent text-black border border-black hover:bg-black hover:text-white",
  };
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-4 py-2 text-lg",
  };

  return (
    <Link
      href={href}
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
    </Link>
  );
}
