interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  className?: string;
}

const SendButton = ({
  children,
  isLoading,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={isLoading}
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

export default SendButton;
