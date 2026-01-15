import { on } from "events";

interface textFieldtype {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({ title, value, onChange }: textFieldtype) => {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {title}
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none bg-white"
      />
    </label>
  );
};
