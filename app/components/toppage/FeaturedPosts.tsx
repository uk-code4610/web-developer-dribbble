import { useState, useEffect } from "react";
import { FetchFeatured } from "@/app/lib/supabase/posts";
import PostCard from "../PostCard";
import { PostCardsType } from "@/app/types/post";

export const FeaturedPosts = () => {
  const [FeaturedPosts, setFeaturedPosts] = useState<PostCardsType[]>([]);
  useEffect(() => {
    const fetchAndFetured = async () => {
      const { data, error } = await FetchFeatured();
      if (error) console.error("Error");
      else setFeaturedPosts(data);
    };
    fetchAndFetured();
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-10 pb-12">
      <div className="mb-5 flex items-end justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900">
          注目の作品
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FeaturedPosts.map((post: PostCardsType) => (
          <div
            key={post.id}
            className="mx-auto w-full max-w-[320px] rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <PostCard
              id={post.id}
              title={post.title}
              description={post.description}
              image_url={post.image_url}
              author={post.profiles?.name ?? "不明"}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
