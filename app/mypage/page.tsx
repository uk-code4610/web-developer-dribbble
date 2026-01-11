"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PostCardsType } from "../types/post";
import { useUser } from "../context/UserContext";
import { myFetchPosts } from "../lib/supabase/posts";
import { useRequireAuth } from "../hooks/useRequireAuth";
import PostCard from "../components/PostCard";

const Mypage = () => {
  const router = useRouter();
  const { userId, displayName, isLoggedIn } = useUser();
  const [userPosts, setUserPosts] = useState<PostCardsType[]>([]);
  useRequireAuth();

  useEffect(() => {
    if (!userId) return;
    const fetchUserData = async () => {
      const { data, error } = await myFetchPosts(userId);
      if (error) console.error("Error fetching user data");
      else setUserPosts(data);
    };
    fetchUserData();
  }, [userId]);
  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              マイページ
            </h1>
          </div>

          <button
            onClick={() => router.push("/posts/create")}
            className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
          >
            新規作成
          </button>
        </div>

        <div className="flex flex-col gap-8">
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-slate-200" />
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-slate-900">
                  {displayName ?? "表示名未設定"}
                </h2>
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                自己紹介
              </label>
              <input
                type="text"
                placeholder="自己紹介文"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-200"
              />
              <div className="mt-6 grid grid-cols-3 gap-6">
                <div className="mt-6 flex w-full max-w-180px flex-col items-center rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-xs text-slate-500">投稿数</span>
                  <span className="mt-1 text-2xl font-semibold text-slate-900">
                    {userPosts.length}
                  </span>
                </div>

                <div className="flex flex-col items-center rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-xs text-slate-500">フォロワー</span>
                  <span className="mt-1 text-2xl font-semibold text-slate-900">
                    -
                  </span>
                </div>
                <div className="flex flex-col items-center rounded-xl bg-slate-50 px-4 py-3">
                  <span className="text-xs text-slate-500">評価</span>
                  <span className="mt-1 text-2xl font-semibold text-slate-900">
                    -
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  投稿した作品
                </h2>
              </div>
              <p className="text-sm text-slate-500">{userPosts.length} 件</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {userPosts.map((post: PostCardsType) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  description={post.description}
                  image_url={post.image_url}
                  author={post.profiles?.name ?? "不明"}
                />
              ))}
            </div>

            {userPosts.length === 0 && (
              <div className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                <p className="text-sm font-medium text-slate-700">
                  まだ投稿がありません
                </p>
                <button
                  onClick={() => router.push("/posts/create")}
                  className="mt-4 inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
                >
                  投稿を作成
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Mypage;
