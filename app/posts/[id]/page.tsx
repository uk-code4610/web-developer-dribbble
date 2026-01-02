"use client";

import { supabase } from "@/app/lib/supabase/client";
import { useState, useEffect } from "react";
import { PostCardsType } from "../page";
import { useParams } from "next/navigation";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const postId = id;
  const [post, setPost] = useState<PostCardsType | null>(null);
  useEffect(() => {
    if (!postId) return;
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("id", postId)
        .single();
      setPost(data);
    };
    fetchPosts();
  }, [postId]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {post === null ? (
        <div className="text-center">
          <p className="text-lg font-semibold">loading...</p>
        </div>
      ) : (
        <div className="text-center max-w-xl w-full">
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <img
            src={post.image_url}
            alt={post.title}
            className="mx-auto w-72 h-72 object-cover rounded-lg shadow mb-4"
          />
          <p className="text-sm leading-relaxed">{post.description}</p>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
