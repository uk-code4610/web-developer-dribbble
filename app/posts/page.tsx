"use client";
export interface PostCardsType {
  id: string;
  title: string;
  description: string;
  image_url: string;
  user_id: string;
  profiles: {
    name: string;
  } | null;
}

import { supabase } from "../lib/supabase/client";
import PostCard from "@/app/components/PostCard";
import { useState, useEffect } from "react";

const Page = () => {
  const [posts, setPosts] = useState<PostCardsType[]>([]);
  const [myPosts, setMyPosts] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const fetchPosts = async () => {
      const Id = (await supabase.auth.getUser()).data.user?.id ?? null;
      setUserId(Id);
      const { data, error } = await supabase
        .from("posts")
        .select("*,profiles(name)")
        .order("created_at", { ascending: false });
      if (error) console.error("Error");
      else setPosts(data);
    };
    fetchPosts();
  }, []);

  const display = myPosts
    ? posts.filter((posts) => posts.user_id === userId)
    : posts;

  return (
    <div>
      <h1>Posts</h1>
      {display.map((display: PostCardsType) => (
        <PostCard
          key={display.id}
          id={display.id}
          title={display.title}
          description={display.description}
          image_url={display.image_url}
          author={display.profiles?.name ?? "不明"}
        />
      ))}
      <div
        style={{
          position: "fixed",
          top: "16px",
          right: "16px",
          zIndex: 10,
        }}
      >
        <button
          onClick={() => setMyPosts((prev) => !prev)}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: myPosts ? "#111" : "#fff",
            color: myPosts ? "#fff" : "#111",
            cursor: "pointer",
          }}
        >
          {myPosts ? "一覧表示" : "自分の投稿"}
        </button>
      </div>
    </div>
  );
};

export default Page;
