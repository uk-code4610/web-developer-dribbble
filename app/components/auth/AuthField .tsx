interface AuthFieldProps {
  title: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthField = ({ title, type, value, onChange }: AuthFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-black focus:ring-1 focus:ring-black"
      />
    </div>
  );
};
