"use client";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import Button from "@/app/components/SendButton";
const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
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
      router.push("/");
    }
  };
  return (
    <>
      <h2>ログイン</h2>
      <form
        onSubmit={loginButton}
        className="mx-auto mt-10 max-w-md space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow"
      >
        <label>メールアドレス</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
        <label>パスワード</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
        <Button type="submit" isLoading={isLogin}>
          ログイン
        </Button>
      </form>
    </>
  );
};

export default login;
