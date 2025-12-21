"use client";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase/client";
const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("");

  const addButton = async (event: React.FormEvent) => {
    event.preventDefault();
    const { data, error } = await supabase.from("posts").insert([
      {
        title: title,
        description: description,
        image_url: imageUrl,
        author: author,
      },
    ]);
    console.log(data);
    setTitle("");
    setDescription("");
    setImageUrl("");
    setAuthor("");
    if (error) {
      console.error("Error inserting post:", error);
    }
  };
  return (
    <form
      onSubmit={addButton}
      className="mx-auto mt-10 max-w-md space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow"
    >
      <label className="block text-sm font-medium text-gray-700">
        タイトル
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        説明
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        画像URL
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        作者
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-md bg-black py-2 text-sm font-semibold text-white hover:bg-gray-800"
      >
        投稿
      </button>
    </form>
  );
};

export default CreatePostPage;
