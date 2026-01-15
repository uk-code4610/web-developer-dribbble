import type { ReactNode } from "react";

type CreateFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
};

export const CreateForm = ({ onSubmit, children }: CreateFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-10 max-w-md space-y-4 rounded-xl border border-blue-100 bg-[#F2FAFF] p-6 shadow-sm"
    >
      {children}
    </form>
  );
};
