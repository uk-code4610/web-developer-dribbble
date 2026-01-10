"use client";
import { useRouter } from "next/navigation";
import { useUser } from "./context/UserContext";

const Page = () => {
  const router = useRouter();
  const { isLoggedIn } = useUser();

  const requireLoginThen = (path: string) => {
    if (isLoggedIn === null) return;
    if (isLoggedIn === false) {
      alert("ログインしてください");
      router.push(`/auth/login?next=${encodeURIComponent(path)}`);
      return;
    }
    router.push(path);
  };

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
          onClick={() => requireLoginThen("/posts/create")}
          className="w-64 px-8 py-4 rounded-2xl bg-white text-[#6B7CFF] text-lg shadow-md hover:bg-[#F4F1F0] transition"
        >
          新規作成
        </button>
        <button
          className="w-64 px-8 py-4 rounded-2xl bg-white text-[#6B7CFF] text-lg shadow-md hover:bg-[#F4F1F0] transition"
          onClick={() => requireLoginThen("/mypage")}
        >
          マイページ
        </button>
      </div>
    </div>
  );
};

export default Page;
