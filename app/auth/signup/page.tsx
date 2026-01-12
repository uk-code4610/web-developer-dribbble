"use client";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/app/components/button/LoadingButton";
import { AuthFormShell } from "@/app/components/auth/ AuthFormShell";
import { AuthField } from "@/app/components/auth/AuthField ";

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
      return;
    }
    if (!data.user) {
      setIsSignup(false);
      alert("ユーザー情報が取得できませんでした");
      return;
    }
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      name: name,
    });
    if (profileError) {
      setIsSignup(false);
      alert(profileError.message);
      return;
    }
    setIsSignup(false);
    alert("会員登録が完了しました。");
    router.push("/auth/login");
  };
  const toLogin = () => {
    router.push("/auth/login");
  };
  return (
    <>
      <AuthFormShell
        title="新規会員登録"
        onSubmit={signupButton}
        footerText="登録済みの方はこちら"
        onFooterClick={toLogin}
      >
        <AuthField
          title="メールアドレス"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthField
          title="名前"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <AuthField
          title="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoadingButton
          type="submit"
          isLoading={isSignup}
          className="w-full rounded-md bg-pink-200 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-pink-300 disabled:opacity-60"
        >
          新規会員登録
        </LoadingButton>
      </AuthFormShell>
    </>
  );
};
export default Signup;
