"use client";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { LoadingButton } from "@/app/components/button/LoadingButton";
import { categories } from "@/app/constants/categories";
import { CreateForm } from "@/app/components/create/CreateForm";
import { TextField } from "@/app/components/create/TextField";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectCategory, setSelectCategory] = useState(categories[0].value);
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
        category: selectCategory,
        user_id: userId,
        author: displayName,
      },
    ]);
    if (error) {
      console.error("Error inserting post:", error);
      alert("投稿の追加中にエラーが発生しました。");
      setCreating(false);
    } else {
      alert("投稿が追加されました！");
      setTitle("");
      setDescription("");
      setImageFile(null);
      setCreating(false);
      router.push("/posts");
    }
  };

  return (
    <CreateForm onSubmit={addButton}>
      <TextField
        title="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        title="説明"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
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
        カテゴリ
        <select
          value={selectCategory}
          onChange={(e) => setSelectCategory(e.target.value)}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-sky-400 focus:outline-none"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-medium text-slate-700">
        作者
        <div className="text-sm text-slate-700">
          {" "}
          <span className="font-medium">{displayName}</span>
        </div>
      </label>
      <LoadingButton type="submit" isLoading={isCreating}>
        投稿
      </LoadingButton>
    </CreateForm>
  );
};

export default CreatePostPage;
