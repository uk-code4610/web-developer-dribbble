"use client";
import { useState } from "react";
import { newPostCards } from "@/app/posts/page";
interface PostFormProps {
  onSubmit: (newPost: newPostCards) => void;
}

const PostForm = ({ onSubmit }: PostFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("");

  const addButton = (event: React.FormEvent) => {
    event.preventDefault();
    const newPost = {
      id: Date.now().toString(),
      title,
      description,
      imageUrl,
      author,
    };
    onSubmit(newPost);
    setTitle("");
    setDescription("");
    setImageUrl("");
    setAuthor("");
  };
  return (
    <>
      <form onSubmit={addButton}>
        <h3>タイトル</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h3>説明</h3>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <h3>画像URL</h3>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <h3>作者</h3>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type={"submit"}>投稿</button>
      </form>
    </>
  );
};
export default PostForm;
