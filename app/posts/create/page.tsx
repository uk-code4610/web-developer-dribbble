"use client";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [author, setAuthor] = useState("");
  const router = useRouter();

  const addButton = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!imageFile) return;
    const ext = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("post-images")
      .upload(fileName, imageFile, {
        contentType: imageFile.type,
      });
    if (uploadError) {
      console.error(uploadError);
      alert(uploadError.message);
      return;
    }
    const { data } = supabase.storage
      .from("post-images")
      .getPublicUrl(fileName);
    const imageUrl = data.publicUrl;
    const { error } = await supabase.from("posts").insert([
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
    setImageFile(null);
    setAuthor("");
    if (error) {
      console.error("Error inserting post:", error);
    } else {
      alert("投稿が追加されました！");
      router.push("/posts");
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
        画像
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (!e.target.files) return;
            setImageFile(e.target.files[0]);
          }}
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
