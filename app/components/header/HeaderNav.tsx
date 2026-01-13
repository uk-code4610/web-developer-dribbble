"use client";

import { usePathname } from "next/navigation";
import { RouteButton } from "../button/ RouteButton";
import { RequireAuthButton } from "../button/RequireAuthButton";
import { HeaderLogo } from "./HeaderLogo";

export const HeaderNav = () => {
  const pathname = usePathname();
  return (
    <header className="w-full border-b bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <HeaderLogo />
        {pathname === "/auth/login" || pathname === "/auth/signup" ? null : (
          <nav className="flex items-center gap-2">
            <RouteButton
              title="一覧表示"
              href="/posts"
              className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-200"
            />
            <RequireAuthButton
              title="新規作成"
              href="/posts/create"
              className="rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-700 shadow-sm transition hover:bg-pink-200"
            />
            <RequireAuthButton
              title="マイページ"
              href="/mypage"
              className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-200"
            />
          </nav>
        )}
      </div>
    </header>
  );
};
