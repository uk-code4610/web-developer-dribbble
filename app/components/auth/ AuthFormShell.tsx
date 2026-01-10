interface AuthFormShellProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  footerText: string;
  onFooterClick: () => void;
}

export const AuthFormShell = ({
  title,
  onSubmit,
  children,
  footerText,
  onFooterClick,
}: AuthFormShellProps) => {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-10">
      <h2 className="text-center text-2xl font-bold tracking-tight">{title}</h2>
      <form
        onSubmit={onSubmit}
        className="w-full space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {children}
        <button
          onClick={onFooterClick}
          type="button"
          className="w-full text-center text-sm font-medium text-blue-600 transition hover:text-blue-700"
        >
          {footerText}
        </button>
      </form>
    </div>
  );
};
