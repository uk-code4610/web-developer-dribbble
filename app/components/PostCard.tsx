interface PostcardProps {
  title: string;
  description: string;
  image_url: string;
  author: string;
}

const PostCard = ({ title, description, image_url, author }: PostcardProps) => {
  return (
    <div className="border rounded-lg shadow-md p-4 max-w-sm w-full mx-auto">
      <h2>{title}</h2>
      <img src={image_url} alt={title} className="w-48 h-48 object-cover" />
      <p>{description}</p>
      <p>by {author}</p>
    </div>
  );
};

export default PostCard;
