import { supabase } from "./client";

export const fetchPosts = async () => {
  return await supabase
    .from("posts")
    .select("*,profiles(name)")
    .order("created_at", { ascending: false });
};
