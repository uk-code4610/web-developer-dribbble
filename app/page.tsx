"use client";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const toPosts = () => {
    router.push("/posts");
  };
  const toCreate = () => {
    router.push("/posts/create");
  };
  return (
    <div>
      <div>
        <button onClick={toPosts}>一覧表示</button>
      </div>
      <div>
        <button onClick={toCreate}>新規作成</button>
      </div>
    </div>
  );
};

export default Page;
