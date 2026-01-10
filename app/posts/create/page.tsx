"use client";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import Button from "@/app/components/LoadingButton";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isCreating, setCreating] = useState(false);
  const router = useRouter();

  const { userId, displayName } = useUser();
  const addButton = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isCreating) return;
    if (!userId) {
      alert("ログインしてください");
      return;
    }
    if (!imageFile) {
      alert("画像を選択してください");
      return;
    }
    setCreating(true);
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
      setCreating(false);
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
        user_id: userId,
        author: displayName,
      },
    ]);
    setTitle("");
    setDescription("");
    setImageFile(null);
    if (error) {
      console.error("Error inserting post:", error);
      alert("投稿の追加中にエラーが発生しました。");
      setCreating(false);
    } else {
      alert("投稿が追加されました！");
      setCreating(false);
      router.push("/posts");
    }
  };

  return (
    <form
      onSubmit={addButton}
      className="mx-auto mt-10 max-w-md space-y-4 rounded-xl border border-blue-100 bg-[#F2FAFF] p-6 shadow-sm"
    >
      <label className="block text-sm font-medium text-slate-700">
        タイトル
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none bg-white"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        説明
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none bg-white"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        画像
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (!e.target.files) return;
            const file = e.target.files[0];
            setImageFile(new File([file], "upload.png", { type: file.type }));
          }}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none bg-white"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        作者
        <div className="text-sm text-slate-700">
          {" "}
          <span className="font-medium">{displayName}</span>
        </div>
      </label>
      <Button type="submit" isLoading={isCreating}>
        投稿
      </Button>
    </form>
  );
};

export default CreatePostPage;
