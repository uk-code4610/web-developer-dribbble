"use client";
import PostForm from "@/components/PostForm";
import { newPostCards } from "@/app/posts/page";
import { useRouter } from "next/navigation";
import { useState } from "react";
const CreatePostPage = () => {
  const [post, setPost] = useState<newPostCards[]>([]);
  const handleSubmit = (newPost: newPostCards) => {
    setPost([...post, newPost]);
    useRouter().push("/posts");
  };
  return <PostForm onSubmit={handleSubmit} />;
};

export default CreatePostPage;
