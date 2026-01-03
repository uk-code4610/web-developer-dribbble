"use client";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-6 items-center">
        <button
          onClick={() => router.push("/posts")}
          className="w-64 px-8 py-4 rounded-2xl bg-[#7C8BFF] text-white text-lg shadow-md hover:bg-[#6B7CFF] transition"
        >
          一覧表示
        </button>

        <button
          onClick={() => router.push("/posts/create")}
          className="w-64 px-8 py-4 rounded-2xl bg-white text-[#6B7CFF] text-lg shadow-md hover:bg-[#F4F1F0] transition"
        >
          新規作成
        </button>
      </div>
    </div>
  );
};

export default Page;
