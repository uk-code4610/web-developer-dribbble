import { RouteButton } from "../button/ RouteButton";

export const Footer = () => {
  return (
    <section className="w-full bg-gradient-to-br from-pink-200 via-violet-200 to-blue-200 py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-6 text-center">
        <h2 className="text-3xl font-medium tracking-wide text-gray-800 md:text-4xl">
          あなたの作品を投稿してみませんか？
        </h2>

        <div className="mt-8 space-y-3 text-base leading-relaxed text-gray-700 md:text-lg">
          <p>未完成でも、シンプルでも構いません。</p>
          <p>フィードバックをもらって、一緒に成長しましょう。</p>
        </div>

        <div className="mt-14">
          <RouteButton
            title="今すぐ投稿する"
            href="/posts/create"
            className="inline-flex items-center justify-center rounded-full bg-white px-14 py-5 text-base font-medium text-gray-800 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};
