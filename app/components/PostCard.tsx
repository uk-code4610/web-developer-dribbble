import Link from "next/link";

interface PostcardProps {
  title: string;
  description: string;
  image_url: string;
  author: string;
  id: string;
}

const PostCard = ({
  title,
  description,
  image_url,
  author,
  id,
}: PostcardProps) => {
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

export default PostCard;
