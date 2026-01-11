"use client";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
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
    <header className="w-full border-b bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <div className="text-sm font-semibold text-gray-800">
          ポートフォリオ版Dribbble
        </div>
        {pathname === "/auth/login" || pathname === "/auth/signup" ? null : (
          <nav className="flex items-center gap-2">
            <button
              onClick={() => router.push("/posts")}
              className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-200"
            >
              一覧表示
            </button>
            <button
              onClick={() => requireLoginThen("/posts/create")}
              className="rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-700 shadow-sm transition hover:bg-pink-200"
            >
              新規作成
            </button>

            <button
              onClick={() => requireLoginThen("/mypage")}
              className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-200"
            >
              マイページ
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};
