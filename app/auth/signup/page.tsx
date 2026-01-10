"use client";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import Button from "@/app/components/SendButton";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();

  const signupButton = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSignup(true);
    if (!email || !password) {
      alert("メールアドレスとパスワードを入力してください");
      setIsSignup(false);
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setIsSignup(false);
      alert(error.message);
    }
    if (!data.user) {
      setIsSignup(false);
      alert("ユーザー情報が取得できませんでした");
      return;
    }
    {
      await supabase.from("profiles").insert({
        id: data.user.id,
        name: name,
      });
      setIsSignup(false);
      alert("会員登録が完了しました。");
      router.push("/auth/login");
    }
  };
  const toLogin = () => {
    router.push("/auth/login");
  };
  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-10">
      <h2 className="text-center text-2xl font-bold tracking-tight">
        新規会員登録
      </h2>

      <form
        onSubmit={signupButton}
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
            名前
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          isLoading={isSignup}
          className="w-full rounded-md bg-pink-200 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-pink-300 disabled:opacity-60"
        >
          新規会員登録
        </Button>
      </form>

      <button
        onClick={toLogin}
        type="button"
        className="w-full text-center text-sm font-medium text-blue-600 transition hover:text-blue-700"
      >
        登録済みの方はこちら
      </button>
    </div>
  );
};
export default Signup;
