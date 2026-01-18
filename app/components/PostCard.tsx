import Link from "next/link";
import { PostcardProps } from "../types/post";
import { categoryLabels, categoryClasses } from "../constants/categories";

export const PostCard = ({
  id,
  title,
  description,
  image_url,
  category,
  author,
}: PostcardProps) => {
  const categoryLabel = categoryLabels[category] ?? category;
  const categoryClass = categoryClasses[category] ?? categoryClasses.other;
  return (
    <Link href={`/posts/${id}`} className="block">
      <article className="bg-[#FFF5F6] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition p-4">
        <div className="aspect-4/3 w-full overflow-hidden rounded-xl bg-muted">
          <img
            src={image_url}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-4 space-y-3">
          <span
            data-category={category}
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium shadow-sm ${categoryClass}`}
          >
            {categoryLabel}
          </span>
          <h2 className="text-lg font-medium leading-tight">{title}</h2>
          <p className="text-xs text-muted-foreground">作成者：{author}</p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </article>
    </Link>
  );
};
