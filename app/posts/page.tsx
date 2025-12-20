"use client";
export interface newPostCards {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
}

import PostCard from "@/components/PostCard";
import PostForm from "@/components/PostForm";
import { useState } from "react";

const Page = () => {
  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "Mountain Climbing UI",
      description: "A UI design for climbers.",
      imageUrl: "/afro_logo.svg",
      author: "Alice",
    },
    {
      id: "2",
      title: "Travel Planner App",
      description: "Organize trips efficiently.",
      imageUrl: "/vercel.svg",
      author: "Bob",
    },
    {
      id: "3",
      title: "Recipe Sharing Platform",
      description: "Share your favorite recipes.",
      imageUrl: "/vercel.svg",
      author: "Charlie",
    },
  ]);
  const addPost = (newPost: newPostCards) => {
    setPosts([...posts, newPost]);
  };
  return (
    <div>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          description={post.description}
          imageUrl={post.imageUrl}
          author={post.author}
        />
      ))}
      <PostForm onSubmit={addPost} />
    </div>
  );
};

export default Page;
