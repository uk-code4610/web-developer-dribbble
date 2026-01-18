"use client";

import { PostCard } from "@/app/components/PostCard";
import { useState, useEffect } from "react";
import { useUser } from "@/app/context/UserContext";
import { fetchPosts } from "../lib/supabase/posts";
import { PostCardsType } from "../types/post";
import { categoryLabels } from "@/app/constants/categories";

const Page = () => {
  const [posts, setPosts] = useState<PostCardsType[]>([]);
  const [myPosts, setMyPosts] = useState(false);
  const { userId } = useUser();
  useEffect(() => {
    const fetchAndSetPosts = async () => {
      const { data, error } = await fetchPosts();
      if (error) console.error("Error");
      else setPosts(data);
    };
    fetchAndSetPosts();
  }, []);

  const getCategoryLabel = (category?: string | null) => {
    return categoryLabels[category ?? ""] ?? "不明";
  };

  const display = myPosts
    ? posts.filter((posts) => posts.user_id === userId)
    : posts;

  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-end justify-between">
          <h1 className="text-2xl font-semibold text-neutral-900">投稿一覧</h1>
          <button
            onClick={() => setMyPosts((prev) => !prev)}
            className={`rounded-full border px-4 py-2 text-sm shadow-sm transition hover:shadow-md ${
              myPosts
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-white text-neutral-900 border-neutral-200"
            }`}
          >
            {myPosts ? "一覧表示" : "自分の投稿"}
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {display.map((post: PostCardsType) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
              image_url={post.image_url}
              category={getCategoryLabel(post.category)}
              author={post.profiles?.name ?? "不明"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
