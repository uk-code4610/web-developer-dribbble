"use client";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/app/components/SendButton";
const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawNext = searchParams.get("next");
  const nextPath = rawNext?.startsWith("/") ? rawNext : "/";
  const loginButton = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLogin(true);
    if (!email || !password) {
      setIsLogin(false);
      alert("メールアドレスとパスワードを入力してください");
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setIsLogin(false);
      alert(error.message);
    } else {
      alert("ログインしました！");
      setIsLogin(false);
      router.push(nextPath);
    }
  };

  const toSignup = () => {
    router.push("/auth/signup");
  };
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-10">
      <h2 className="text-center text-2xl font-bold tracking-tight">
        ログイン
      </h2>

      <form
        onSubmit={loginButton}
        className="w-full space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            メールアドレス
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            パスワード
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>

        <Button
          type="submit"
          isLoading={isLogin}
          className="w-full rounded-md bg-pink-200 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-pink-300 disabled:opacity-60"
        >
          ログイン
        </Button>
      </form>
      <button
        onClick={toSignup}
        type="button"
        className="w-full text-center text-sm font-medium text-blue-600 transition hover:text-blue-700"
      >
        登録がまだの方はこちら
      </button>
    </div>
  );
};

export default login;
