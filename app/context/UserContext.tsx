"use client";

import {
  useState,
  createContext,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { supabase } from "@/app/lib/supabase/client";
export const UserContext = createContext<UserContextType>({
  userId: null,
  displayName: null,
  isLoggedIn: false,
});

interface UserContextType {
  userId: string | null;
  displayName: string | null;
  isLoggedIn: boolean;
}

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const fetchProfiles = async () => {
      const { data } = await supabase.auth.getUser();
      const uid = data.user?.id ?? null;
      setUserId(uid);
      setIsLoggedIn(!!data.user);
      if (!uid) {
        setDisplayName(null);
        return;
      }
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", uid)
        .single();
      setDisplayName(profile?.name ?? null);
    };
    fetchProfiles();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userId,
        displayName,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
