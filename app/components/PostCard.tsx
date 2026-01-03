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
      <article className="bg-[#FFF5F6] rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 max-w-sm w-full mx-auto">
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-muted">
          <img
            src={image_url}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-4 space-y-2">
          <h2 className="text-lg font-medium leading-tight">{title}</h2>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
          <p className="text-sm text-muted-foreground">{author}</p>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
