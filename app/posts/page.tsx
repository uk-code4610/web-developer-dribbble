"use client";
export interface PostCardsType {
  id: string;
  title: string;
  description: string;
  image_url: string;
  profiles: {
    name: string;
  } | null;
}

import { supabase } from "../lib/supabase/client";
import PostCard from "@/app/components/PostCard";
import { useState, useEffect } from "react";

const Page = () => {
  const [posts, setPosts] = useState<PostCardsType[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*,profiles(name)")
        .order("created_at", { ascending: false });
      if (error) console.error("Error");
      else setPosts(data);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post: PostCardsType) => (
        <PostCard
          key={post.id}
          title={post.title}
          description={post.description}
          image_url={post.image_url}
          author={post.profiles?.name ?? "不明"}
        />
      ))}
    </div>
  );
};

export default Page;
