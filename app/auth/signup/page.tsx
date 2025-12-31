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
    <>
      <h2>新規会員登録</h2>
      <form
        onSubmit={signupButton}
        className="mx-auto mt-10 max-w-md space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow"
      >
        <label>メールアドレス</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
        <label>名前</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
        <label>パスワード</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
        <Button type="submit" isLoading={isSignup}>
          新規会員登録
        </Button>

        <button onClick={toLogin} type="button">
          登録済みの方はこちら
        </button>
      </form>
    </>
  );
};
export default Signup;
