"use client";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingButton } from "@/app/components/LoadingButton";
import { AuthFormShell } from "@/app/components/auth/ AuthFormShell";
import { AuthField } from "@/app/components/auth/AuthField ";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawNext = searchParams.get("next");
  const nextPath = rawNext?.startsWith("/") ? rawNext : "/";
  const loginButton = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      if (!email || !password) {
        alert("メールアドレスとパスワードを入力してください");
        return;
      }
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        alert(error.message);
        return;
      }
      alert("ログインしました！");
      router.push(nextPath);
    } catch (err) {
      alert("予期しないエラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toSignup = () => {
    router.push("/auth/signup");
  };
  return (
    <>
      <AuthFormShell
        title="ログイン"
        onSubmit={loginButton}
        footerText="登録がまだの方はこちら"
        onFooterClick={toSignup}
      >
        <AuthField
          title="メールアドレス"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthField
          title="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoadingButton
          type="submit"
          isLoading={isSubmitting}
          className="w-full rounded-md bg-pink-200 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-pink-300 disabled:opacity-60"
        >
          ログイン
        </LoadingButton>
      </AuthFormShell>
    </>
  );
};

export default Login;
