import { supabase } from "./client";

export const fetchPosts = async () => {
  return await supabase
    .from("posts")
    .select("*,profiles(name)")
    .order("created_at", { ascending: false });
};

export const fetchPostById = async (postId: string) => {
  return await supabase
    .from("posts")
    .select("*,profiles(name)")
    .eq("id", postId)
    .single();
};

export const myFetchPosts = async (user_Id: string) => {
  return await supabase
    .from("posts")
    .select("*,profiles(name)")
    .eq("user_id", user_Id)
    .order("created_at", { ascending: false });
};
