import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  className?: string;
}

export const LoadingButton = ({
  children,
  isLoading,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={`w-full rounded-md py-2 text-sm font-semibold text-white ${
        isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-black hover:bg-gray-800"
      } ${className}`}
    >
      {isLoading ? "処理中..." : children}
    </button>
  );
};
