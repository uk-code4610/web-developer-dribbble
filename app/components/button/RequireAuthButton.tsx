"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { supabase } from "@/app/lib/supabase/client";
import { RouteButtonProps } from "@/app/types/route";

export const RequireAuthButton = ({
  title,
  href,
  className,
  disabled,
}: RouteButtonProps) => {
  const router = useRouter();
  const { isLoggedIn } = useUser();
  const requireLoginThen = async (path: string) => {
    if (isLoggedIn === null) {
      const { data, error } = await supabase.auth.getUser();
      const loggedIn = !!data.user && !error;

      if (!loggedIn) {
        alert("ログインしてください");
        router.push(`/auth/login?next=${encodeURIComponent(path)}`);
        return;
      }
      router.push(path);
      return;
    }
    if (isLoggedIn === false) {
      alert("ログインしてください");
      router.push(`/auth/login?next=${encodeURIComponent(path)}`);
      return;
    }
    router.push(path);
  };
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => void requireLoginThen(href)}
      className={className}
    >
      {title}
    </button>
  );
};
