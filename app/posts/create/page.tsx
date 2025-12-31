"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import Button from "@/app/components/SendButton";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isCreating, setCcreating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data: auth } = await supabase.auth.getUser();
      const userId = auth.user?.id;
      const { data: profiles } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", userId)
        .single();

      setUsername(profiles?.name ?? null);
    };
    fetchProfiles();
  }, []);

  const addButton = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isCreating) return;
    setCcreating(true);
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
      setCcreating(false);
      return;
    }
    const { data } = supabase.storage
      .from("post-images")
      .getPublicUrl(fileName);
    const imageUrl = data.publicUrl;
    const { data: userData, error: userError } = await supabase.auth.getUser();
    const userId = userData.user?.id;
    const { error } = await supabase.from("posts").insert([
      {
        title: title,
        description: description,
        image_url: imageUrl,
        user_id: userId,
      },
    ]);
    console.log(data);
    setTitle("");
    setDescription("");
    setImageFile(null);
    if (error) {
      console.error("Error inserting post:", error);
      setCcreating(false);
    } else {
      alert("投稿が追加されました！");
      setCcreating(false);
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
            const file = e.target.files[0];
            setImageFile(new File([file], "upload.png", { type: file.type }));
          }}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        作者
        <div className="text-sm text-gray-700">
          {" "}
          <span className="front-medium">{username}</span>
        </div>
      </label>
      <Button type="submit" isLoading={isCreating}>
        投稿
      </Button>
    </form>
  );
};

export default CreatePostPage;
