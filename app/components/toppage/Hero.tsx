"use client";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const router = useRouter();
  return (
    <section className="w-full bg-sky-50/60">
      <div className="mx-auto flex max-w-6xl items-center gap-10 px-6 py-14">
        {/* 左：テキスト */}
        <div className="flex-1">
          <p className="mb-3 inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
            初心者でも投稿しやすいポートフォリオ共有
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            GrowForio
          </h1>
          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            評価される ポートフォリオが分かる。
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            AIと現役エンジニアからフィードバックが貰える。
            <br />
            転職で通用するポートフォリオ作りをサポート。
          </p>

          <div className="mt-7 flex items-center gap-3">
            <button
              onClick={() => router.push("/posts")}
              className="rounded-md bg-pink-200 px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-pink-300"
            >
              作品を見る
            </button>
          </div>
        </div>

        {/* 右：画像/プレビュー（今は空けてOK） */}
        <div className="hidden flex-1 md:block">
          <div className="h-72 w-full rounded-2xl border border-white/60 bg-white/60 shadow-sm backdrop-blur">
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              ここにイメージ画像
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
