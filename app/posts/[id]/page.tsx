"use client";

import { useState, useEffect } from "react";
import { PostCardsType } from "@/app/types/post";
import { useParams } from "next/navigation";
import { fetchPostById } from "@/app/lib/supabase/posts";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const postId = id;
  const [post, setPost] = useState<PostCardsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    const fetchAndSetPost = async () => {
      setIsLoading(true);
      const { data, error } = await fetchPostById(postId);

      if (error) {
        console.error("Error fetching post:", error);
        setPost(null);
      } else {
        setPost(data ?? null);
      }

      setIsLoading(false);
    };

    fetchAndSetPost();
  }, [postId]);

  const createdAt = post?.created_at;
  const date = createdAt ? new Date(createdAt) : null;
  const formatDate =
    date && !Number.isNaN(date.getTime())
      ? date.toLocaleDateString("ja-JP")
      : "";

  return (
    <div className="min-h-screen bg-[#FAF7F6] py-12 px-6">
      <div className="mx-auto max-w-3xl">
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <p className="text-sm text-neutral-500">loading...</p>
          </div>
        ) : post === null ? (
          <div className="flex items-center justify-center py-24">
            <p className="text-sm text-neutral-500">投稿が見つかりません</p>
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h1 className="text-3xl font-semibold text-neutral-900 mb-6">
              {post.title}
            </h1>
            <img
              src={post.image_url}
              alt={post.title}
              className="mx-auto w-full max-w-md aspect-square object-cover rounded-xl shadow mb-6"
            />
            <div className="mb-6 flex items-center gap-4 text-sm text-neutral-500">
              <span>
                作成者：
                <span className="font-medium text-neutral-700">
                  {post.profiles?.name ?? "不明"}
                </span>
              </span>
              {formatDate && (
                <span className="before:mx-2 before:text-neutral-300 before:content-['·']">
                  {formatDate}
                </span>
              )}
            </div>
            <p className="text-sm leading-relaxed text-neutral-700">
              {post.description}
            </p>
            <button
              onClick={() => window.history.back()}
              className="mt-8 inline-block text-sm text-neutral-500 hover:text-neutral-900 transition"
            >
              一覧へ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
