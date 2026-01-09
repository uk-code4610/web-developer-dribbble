"use client";
import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

export const useRequireAuth = () => {
  const { isLoggedIn } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("auth/login");
      alert("ログインが必要です");
    }
  }, [isLoggedIn, router]);
};
